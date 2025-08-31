import Express from "express";
import Course from "../models/course.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";


export const addNewCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth?.userId;

    if (!educatorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!imageFile) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const parsedCourseData = JSON.parse(courseData);

    // upload thumbnail first
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "course_thumbnails",
    });

    parsedCourseData.educator = educatorId; // Clerk userId (string)
    parsedCourseData.courseThumbnail = imageUpload.secure_url;

    const newCourse = await Course.create(parsedCourseData);

    res.status(201).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (error) {
    console.error("Error adding new course:", error);
    res.status(500).json({
      message: "Failed to add new course",
      error: error.message,
    });
  }
};
