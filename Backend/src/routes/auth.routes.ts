import  Express  from "express";
import { registerUser, loginUser, getUsers } from "../controllers/auth";
import { get } from "mongoose";

const userRouter = Express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/users', getUsers)

export default userRouter;