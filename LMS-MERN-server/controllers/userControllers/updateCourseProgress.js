import { CourseProgress } from "../../models/courseProgress.model.js";
import User from "../../models/user.model.js";

export const updateCourseProgress = async(req, res ) => {
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body

        const progressData = await CourseProgress.findOne({userId, courseId})

        if(progressData){
            if(progressData.lectureCompleted.includes(lectureId)){
                return res.status(200).json({success : true , message : "Lecture already completed"})
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        }

        else {
            await CourseProgress.create({
                courseId,
                userId,
                lectureCompleted: [lectureId]
            })
        }

        
        res.status(200).json({success : true , message : "Course progress updated successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false , message : error.message})
    }
}

// get user course progress

export const getUserCourseProgress = async(req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId } = req.body

        const progressData = await CourseProgress.findOne({userId, courseId})

        res.status(200).json({success : true , message : "Course progress fetched successfully" , data : progressData})

    } catch (error) {
        console.log(error);
        res.status(500).json({success : false , message : error.message})
    }
}