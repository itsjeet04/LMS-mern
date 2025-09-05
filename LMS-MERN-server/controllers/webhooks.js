import { Webhook } from "svix";
import User from "../models/user.model.js";
import Stripe from "stripe";
import { Purchase } from "../models/purchase.js";
import Course from "../models/course.model.js";

export const clerkWebhooks = async (req, res) => {
  try {
    if (!req.rawBody) {
      throw new Error("Raw body not available");
    }

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = whook.verify(req.rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { type, data } = payload;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };
        await User.create(userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error processing webhook" });
  }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const purchaseId = paymentIntent.metadata?.purchaseId;

        if (!purchaseId) {
          return res.status(400).send("purchaseId missing");
        }

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) break;

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (userData && courseData) {
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();

          userData.enrolledCourses.push(courseData._id);
          await userData.save();

          purchaseData.status = "success";
          await purchaseData.save();
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const purchaseId = paymentIntent.metadata?.purchaseId;

        if (purchaseId) {
          await Purchase.findByIdAndUpdate(purchaseId, {
            status: "failed",
          });
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: "Webhook handler failed" });
  }
};
