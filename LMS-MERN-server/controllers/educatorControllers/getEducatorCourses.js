import Course from "../../models/course.model.js"


export const getEducatorCourses = async(req,res) => {
    const educator = req.auth.userId 
    console.log(educator)

    try {
        const courses = await Course.find({educator})
        res.json({success : true , courses})
    } catch (error) {
        console.error("error in getting course : " ,error)
        res.json({success : false , message : error.message})
    }
}