import { Webhook } from "svix";
// webhook is a middleware function that verifies the incoming events
// A webhook is a way for one application to notify another in real time.
// Webhook = event notification via HTTP.

import User from "../models/user.model.js";
import bodyParser from "body-parser";


//api controller function to manage clerk user with database
export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

         whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        const { type, data } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }
                await User.create(userData)
                res.json({ message: "User created successfully" });
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                res.json({ message: "User deleted successfully" })
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({ message: "User updated successfully" })
                break;
            }

            default:
                break;
        }

    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(400).json({ message: "Error processing webhook" });
    }
}
