import express from 'express';
import * as userController from "../controllers/UserController.js";
import { authenticateJWT } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', authenticateJWT, userController.getProfile);

export default userRouter;