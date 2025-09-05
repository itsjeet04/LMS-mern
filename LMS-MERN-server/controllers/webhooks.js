import { Webhook } from "svix";
import User from "../models/user.model.js";
import Stripe from "stripe";
import { Purchase } from "../models/purchase.js";
import Course from "../models/course.model.js";

//  Clerk actually uses Svix under the hood to send webhooks securely.
// Your webhook is the messenger that keeps your LMS student records up-to-date with Clerk.

export const clerkWebhooks = async (req, res) => {
  try {
    // Ensure you have the raw body buffer
    if (!req.rawBody) {
      throw new Error("Raw body not available. Make sure to use the raw body parser middleware.");
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the raw body from the request
    const payload = whook.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // `payload` is now the verified and parsed JavaScript object
    const { type, data } = payload;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url,
        };
        await User.create(userData);
        console.log("User created in DB:", userData._id);
        break; // Added break
      }
      case "user.deleted": {
        // Clerk might send an event for a user that doesn't exist in your DB yet.
        // The `data.id` is the user's Clerk ID.
        await User.findByIdAndDelete(data.id);
        console.log("User deleted from DB:", data.id);
        break; // Added break
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated in DB:", data.id);
        break; // Added break
      }
    }

    // Always respond with a 200 OK to Clerk
    res.status(200).json({ message: "Webhook processed successfully" });

  } catch (error) {
    console.error("Error processing webhook:", error.message);
    res.status(400).json({ message: "Error processing webhook" });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = Stripe.webhooks.constructEvent(
      req.body, // raw buffer (make sure express.raw() is used in server.js)
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log("✅ Stripe event received:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const purchaseId = session.metadata?.purchaseId;

        console.log("🛒 purchaseId from metadata:", purchaseId);

        if (!purchaseId) {
          console.error("❌ Missing purchaseId in session metadata");
          return res.status(400).send("purchaseId missing");
        }

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) {
          console.error("❌ Purchase not found:", purchaseId);
          break;
        }

        const userData = await User.findById(purchaseData.userId);
        if (!userData) {
          console.error("❌ User not found:", purchaseData.userId);
          break;
        }

        const courseData = await Course.findById(purchaseData.courseId);
        if (!courseData) {
          console.error("❌ Course not found:", purchaseData.courseId);
          break;
        }

        // Enroll user
        courseData.enrolledStudents.push(userData._id);
        await courseData.save();

        userData.enrolledCourses.push(courseData._id);
        await userData.save();

        purchaseData.status = "success";
        await purchaseData.save();

        console.log("✅ Purchase marked as success:", purchaseId);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        const purchaseId = session.metadata?.purchaseId;

        if (purchaseId) {
          await Purchase.findByIdAndUpdate(purchaseId, { status: "failed" });
          console.log("❌ Purchase expired:", purchaseId);
        }
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("🔥 Error handling webhook:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

