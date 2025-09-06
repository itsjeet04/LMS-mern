import Course from "../../models/course.model.js"
import User from "../../models/user.model.js"

export const addUserRating = async (req, res) => {
    const userId = req.auth.userId 
    const { courseId, rating } = req.body

    if(rating < 1 || rating > 5){
        return res.json({success: false , message : "Rating should be between 1 and 5"})
    }

    try {
        const course = await Course.findById(courseId)
        const user = await User.findById(userId)

        if (!user.enrolledCourses.includes(courseId)){
            return res.json({success : false , message : "Register to rate the course."})
        }

        const existingRatingIndex = course.courseRatings.findIndex(r => r.userId === userId)
        if (existingRatingIndex !== -1) {
            course.courseRatings[existingRatingIndex].rating = rating
        }
        else {
            course.courseRatings.push({ userId, rating })
        }
        await course.save()

        res.json({ success: true, message: "Rating added/updated successfully." })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }

}