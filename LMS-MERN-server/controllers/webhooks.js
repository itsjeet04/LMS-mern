import { Webhook } from "svix";
import User from "../models/user.model.js";
import Stripe from "stripe";

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

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
export const stripeWebhooks = async(req,res) => {
   
}