import Course from "../../models/course.model.js";
import { Purchase } from "../../models/purchase.js";

const getEnrolledStudentsDataWithPurchaseData = async (req, res) => {
    try {
        const educatorId = req.auth.UserId
        const courses = await Course.find({educator : educatorId})

        const courseIds = courses.map(course => course._id)
        console.log(courseIds)

        const purchases = await Purchase.find({
            courseId : {$in : courseIds},
            status : 'completed'
        }).populate('userId' , 'name imageUrl') 
        // .populate('userId', 'name imageUrl') tells Mongoose:
        // Replace that ID with the actual User document.
        // But only include the name and imageUrl fields (plus _id automatically).
        .populate('courseId' , 'courseTitle')

        const enrolledStudents = purchases.map(purchase=> ({
            student : purchase.userId,
            courseTitle : purchase.courseId.courseTitle,
            purchaseDate : purchase.createdAt
        }))

        res.status(200).json({ success: true, data: studentsWithPurchase });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
};
export default getEnrolledStudentsDataWithPurchaseData