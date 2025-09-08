import express from 'express';
import { updateRoleToEducator } from '../controllers/educatorControllers/becomeEducator.js';
import { upload } from '../middlewares/multer.middleware.js';
import { protectEducator } from '../middlewares/authProtectEducator.middleware.js';
import { addNewCourse } from '../controllers/educatorControllers/addNewCourse.js';
import { getEducatorCourses } from '../controllers/educatorControllers/getEducatorCourses.js';
import { getEducatorDashboard } from '../controllers/educatorControllers/getEducatorDashboard.js'; 
import getEnrolledStudentsDataWithPurchaseData from '../controllers/educatorControllers/getEnrolledStudentsDataWithPurchaseData.js';




const educatorRouter = express.Router();

// add educator role to user 
educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.get('/add-course', upload.single('thumbnail') , protectEducator , addNewCourse );
educatorRouter.get('/courses', protectEducator , getEducatorCourses );
educatorRouter.get('/educator-dashboard', protectEducator , getEducatorDashboard );
educatorRouter.get('/educator-students', protectEducator , getEnrolledStudentsDataWithPurchaseData );


export default educatorRouter;