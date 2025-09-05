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
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    // Use raw body for verification
    event = Stripe.webhooks.constructEvent(
      req.body, // raw buffer from express.raw()
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        // Retrieve checkout session by payment_intent
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });

        const purchaseId = session.data[0]?.metadata?.purchaseId;
        if (!purchaseId) {
          console.error("purchaseId missing in metadata");
          return res.status(400).send("purchaseId missing in session metadata");
        }

        const purchaseData = await Purchase.findById(purchaseId); 
        if (!purchaseData) {
          console.error("Purchase not found:", purchaseId);
          return res.status(404).send("Purchase not found");
        }

const userData = await User.findOne({ _id: purchaseData.userId }); 
const courseData = await Course.findById(purchaseData.courseId);

if (!userData || !courseData) {
  console.error("User or Course not found");
  return res.status(400).send("User or Course not found");
}

        if (!userData.enrolledCourses.includes(courseData._id)) {
          userData.enrolledCourses.push(courseData._id);
          await userData.save();
        }

        courseData.enrolledStudents.push(userData._id);
await courseData.save();

userData.enrolledCourses.push(courseData._id);
await userData.save();

        purchaseData.status = "success";
        await purchaseData.save();

        console.log("Payment succeeded and DB updated:", purchaseId);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });

        const purchaseId = session.data[0]?.metadata?.purchaseId;
        if (!purchaseId) {
          console.error("purchaseId missing in metadata");
          return res.status(400).send("purchaseId missing in session metadata");
        }

        const purchaseData = await Purchase.findById(purchaseId);
        if (purchaseData) {
          purchaseData.status = "failed";
          await purchaseData.save();
          console.log("Payment failed, updated purchase:", purchaseId);
        }

        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Error handling Stripe webhook:", err.message);
    res.status(500).json({ error: "Webhook handler failed" });
  }
}