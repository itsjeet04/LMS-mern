import User from "../../models/user.model.js";

export const userEnrolledCourses = async(req,res) => {
    try {
        const userId = req.auth.userId 
        const userData = await User.findById(userId).populate('enrolledCourses')

        if(!userData){
           return res.json({success : false , message : "userData not found"})
        }

        res.json({success : true , enrolledCourses : userData.enrolledCourses}) 

    } catch (error) {
        console.error(error)
        res.json({success: false , message :  error.message})
    }
}