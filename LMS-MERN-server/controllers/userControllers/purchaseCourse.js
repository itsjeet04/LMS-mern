import Course from "../../models/course.model.js";
import { Purchase } from "../../models/purchase.js";
import User from "../../models/user.model.js";
import Stripe from "stripe";

export const purchaseCourse = async (req, res) => {
  try {
    
    const { courseId } = req.body;
    const userId = req.auth.userId; // Clerk userId

    const userData = await User.findById(userId);
    if (!userData) return res.json({ success: false, message: "userData not found" });

    const courseData = await Course.findById(courseId);
    if (!courseData) return res.json({ success: false, message: "courseData not found" });

    // calculate discounted price
    const discountedPrice =
      courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;

    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId: userData._id,
      amount: Number(discountedPrice.toFixed(2)),
      status: "pending",
    });

    // Stripe Gateway (PaymentIntent)
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(newPurchase.amount * 100), // in cents
      currency,
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    // Send client_secret to frontend
    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
