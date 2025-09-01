import express from 'express'
import { getAllCourses } from '../controllers/courseControllers/getAllCourses.js';
import { getCourseById } from '../controllers/courseControllers/getCourseById.js';


const courseRouter = express.Router()

courseRouter.get('/all-courses' , getAllCourses)
courseRouter.get('/:id' , getCourseById)

export default courseRouter ;