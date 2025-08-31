import express from 'express';
import { updateRoleToEducator } from '../controllers/educatorController.js';
import { upload } from '../middlewares/multer.middleware.js';
import { protectEducator } from '../middlewares/auth.middleware.js';
import { addNewCourse } from '../controllers/addNewCourse.js';


const educatorRouter = express.Router();

// add educator role to user 
educatorRouter.post('/update-role', updateRoleToEducator);
educatorRouter.get('/add-course', upload.single('thumbnail') , protectEducator , addNewCourse );

export default educatorRouter;