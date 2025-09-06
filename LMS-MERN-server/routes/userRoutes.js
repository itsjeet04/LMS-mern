import express from 'express'
import { getUserData } from '../controllers/userControllers/getUserData.js'
import { userEnrolledCourses } from '../controllers/userControllers/userEnrolledCourses.js'
import { purchaseCourse } from '../controllers/userControllers/purchaseCourse.js'
import { getUserCourseProgress, updateCourseProgress } from '../controllers/userControllers/updateCourseProgress.js'
import { addUserRating } from '../controllers/userControllers/addUserRating.js'

export const userRouter = express.Router()

userRouter.get('/data' , getUserData)
userRouter.get('/enrolled-courses' , userEnrolledCourses)
userRouter.post('/purchase' , purchaseCourse)
userRouter.post('/update-course-progress' , updateCourseProgress)
userRouter.get('/get-course-progress' , getUserCourseProgress)
userRouter.post('/add-rating' , addUserRating)