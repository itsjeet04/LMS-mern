import Express from "express";
import Course from "../models/course.model";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const addNewCourse = async (req, res) => {
     try {
        const {courseData} = req.body;
        const imageFile = req.files; // multer adds the files to req.files
        const educatorId = req.auth.userId;
        if(!educatorId){
            return res.status(401).json({message : "Unauthorized"});
        }
        if (!imageFile){
            return res.status(400).json({message : "No image file"})
        }
        // const parsedCourseData = JSON.parse(courseData)
        const parsedCourseData = courseData
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData);

        const imageUpload  = await cloudinary.uploader.upload(imageFile.path )
        imageUpload.secure_url // public URL of the uploaded image

        newCourse.courseThumbnail = imageUpload.secure_url;
        await newCourse.save();
        
        res.status(201).json({message : "Course created successfully", courseId : newCourse._id});

     } catch (error) {
        console.error("Error adding new course:", error);
        res.status(500).json({message : "Failed to add new course" , error : error.message});
     }
}

