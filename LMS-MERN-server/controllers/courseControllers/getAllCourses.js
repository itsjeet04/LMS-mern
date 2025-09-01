import Course from "../../models/course.model.js"

// get all courses 
export const getAllCourses = async(req,res) => {
    try {
        const courses = await Course.find({isPublished : true}).select(['-courseContent', '-enrolledStudents']).populate({path:'educator'}) // Replace the educator ID with the full educator document from the User collection.

        res.json({success : true , courses })

    } catch (error) {
        console.error(error)
        res.json({success: false , message :  error.message})
    }
}