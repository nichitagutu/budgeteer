import express from 'express';
import { addUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', addUser);

export default userRouter;
