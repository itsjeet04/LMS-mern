import express from 'express';
import { updateRoleToEducator } from '../controllers/educatorController.js';

const educatorRouter = express.Router();

// add educator role to user 
educatorRouter.post('/update-role', updateRoleToEducator);

export default educatorRouter;