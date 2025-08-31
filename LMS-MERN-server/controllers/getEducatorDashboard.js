// total earning , enrolled students , no. of courses 

import Course from "../models/course.model.js"
import { Purchase } from "../models/purchase.js"

export const getEducatorDashboard = async (req, res) => {

    try {
        const educatorId = req.auth.userId
        console.log(req.auth)
        const courses = await Course.find({ educator: educatorId })
        const totalCourses = courses.length

        const courseIds = courses.map(course => course._id)

        const purcheses = await Purchase.find({
            courseId: { $in: courseIds }, //$in is a set-membership operator.
            status: 'completed'
        })
        const totalEarnings = purcheses.reduce((sum, purchase) => sum + purchase.amount, 0) //iterates the array and accumulates a single value.

        const enrolledStudentsData = []
        for (const course of courses) {
            const students = await User.find(
                { _id: { $in: course.enrolledStudents } },
                'name imageUrl'
            )

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            })
        }

        res.json({
            success: true, dashboardData:
                {totalEarnings, enrolledStudentsData, totalCourses}
        })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}