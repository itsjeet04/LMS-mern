import express from 'express'
import { getUserData } from '../controllers/userControllers/getUserData.js'
import { userEnrolledCourses } from '../controllers/userControllers/userEnrolledCourses.js'

export const userRouter = express.Router()

userRouter.get('/data' , getUserData)
userRouter.get('/enrolled-courses' , userEnrolledCourses)