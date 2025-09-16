// controllers/educator/getEnrolledStudentsDataWithPurchaseData.js

import Course from "../../models/course.model.js";
import { Purchase } from "../../models/purchase.js";
import User from "../../models/user.model.js";

const getEnrolledStudentsDataWithPurchaseData = async (req, res) => {
  try {
    const educatorId = req.auth.userId; // Clerk/Firebase ID of educator

    const courses = await Course.find({ educator: educatorId });

    if (!courses.length) {
      return res.status(200).json({ success: true, enrolledStudents: [] });
    }

    const courseIds = courses.map(c => c._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "success"
    }).populate("courseId", "courseTitle");

    if (!purchases.length) {
      return res.status(200).json({ success: true, enrolledStudents: [] });
    }

    const userIds = [...new Set(purchases.map(p => p.userId))];

    const users = await User.find(
      { _id: { $in: userIds } },
      "name imageUrl _id"
    );

    const enrolledStudents = purchases.map(purchase => {
      const student = users.find(u => u._id === purchase.userId);

      return {
        student: {
          _id: purchase.userId,
          name: student?.name ,
          imageUrl: student?.imageUrl 
        },
        courseTitle: purchase.courseId?.courseTitle || "Unknown Course",
        purchaseDate: purchase.createdAt
      };
    });

    res.status(200).json({ success: true, enrolledStudents });

  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getEnrolledStudentsDataWithPurchaseData;
