import Course from "../../models/course.model.js"
import User from "../../models/user.model.js"

export const addUserRating = async (req, res) => {
  try {
    const userId = req.auth?.userId
    const { courseId, rating } = req.body

    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" })
    if (!courseId || !rating) return res.status(400).json({ success: false, message: "Course ID and rating required" })
    if (rating < 1 || rating > 5) return res.status(400).json({ success: false, message: "Rating should be between 1 and 5" })

    const user = await User.findOne({ _id: userId })
    const course = await Course.findById(courseId)

    if (!user) return res.status(404).json({ success: false, message: "User not found" })
    if (!course) return res.status(404).json({ success: false, message: "Course not found" })

    const isEnrolled = user.enrolledCourses.some(c => String(c) === String(courseId))
    if (!isEnrolled) return res.json({ success: false, message: "Register to rate the course." })

    const existingRatingIndex = course.courseRatings.findIndex(r => String(r.userId) === String(userId))
    if (existingRatingIndex !== -1) {
      course.courseRatings[existingRatingIndex].rating = rating
    } else {
      course.courseRatings.push({ userId, rating })
    }

    await course.save()
    res.json({ success: true, message: "Rating added/updated successfully." })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
