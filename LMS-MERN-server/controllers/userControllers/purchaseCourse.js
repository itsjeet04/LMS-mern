import Course from "../../models/course.model.js";
import { Purchase } from "../../models/purchase.js";
import User from "../../models/user.model.js";
import Stripe from "stripe";

export const purchaseCourse = async (req, res) => {
  try {

    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId; // Clerk userId (string)

    // fetch user from DB using Clerk userId
    const userData = await User.findById( userId); 

    
    const courseData = await Course.findById(courseId);

    if (!userData) {
      return res.json({ success: false, message: "userData not found" });
    }
    if (!courseData) {
      return res.json({ success: false, message: "courseData not found" });
    }

    // calculate discounted price
    const discountedPrice =
      courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;

    const purchaseData = {
      courseId: courseData._id,
      userId: userData._id, // ✅ MongoDB ObjectId from User collection
      amount: Number(discountedPrice.toFixed(2)),
    };

    const newPurchase = await Purchase.create(purchaseData);

    // Stripe Gateway
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.round(newPurchase.amount * 100), 
        },
        quantity: 1,
      },
    ];
    
    // Creates a Stripe Checkout session, attaching purchaseId in metadata.
    const paymentSession = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    // If successful, Stripe triggers an event → but your server won’t know yet until the webhook fires.

    res.json({ success: true, session_url: paymentSession.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
