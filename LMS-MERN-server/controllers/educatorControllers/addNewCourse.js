import Express from "express";
import Course from "../../models/course.model.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export const addNewCourse = async (req, res) => {
  try {
    console.log("----- Incoming Add Course Request -----");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("AUTH:", req.auth);

    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth?.userId;

    // ✅ Auth check
    if (!educatorId) {
      console.warn("No educatorId found in req.auth");
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ File check
    if (!imageFile) {
      console.warn("No image file found in request");
      return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    // ✅ Parse courseData safely
    let parsedCourseData;
    try {
      parsedCourseData = typeof courseData === "string" ? JSON.parse(courseData) : courseData;
    } catch (err) {
      console.error("Error parsing courseData:", err.message);
      return res.status(400).json({ success: false, message: "Invalid courseData format" });
    }

    console.log("Parsed Course Data:", parsedCourseData);

    // ✅ Upload thumbnail to Cloudinary
    let imageUpload;
    try {
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: "course_thumbnails",
      });
      console.log("Cloudinary Upload Success:", imageUpload.secure_url);
    } catch (cloudErr) {
      console.error("Cloudinary Upload Failed:", cloudErr);
      return res.status(500).json({ success: false, message: "Image upload failed" });
    }

    // ✅ Attach educator & thumbnail
    parsedCourseData.educator = educatorId;
    parsedCourseData.courseThumbnail = imageUpload.secure_url;

    // ✅ Create Course in DB
    let newCourse;
    try {
      newCourse = await Course.create(parsedCourseData);
      console.log("Course Created:", newCourse._id);
    } catch (dbErr) {
      console.error("Database Save Error:", dbErr);
      return res.status(500).json({ success: false, message: "Failed to save course", error: dbErr.message });
    }

    // ✅ Success Response
    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      courseId: newCourse._id,
    });

  } catch (error) {
    console.error("Unexpected Error in addNewCourse:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add new course",
      error: error.message,
      stack: error.stack, // 👈 useful during debugging
    });
  }
};
