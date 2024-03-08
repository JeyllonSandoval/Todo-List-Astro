import  Express  from "express";
import { registerUser, loginUser } from "../controllers/user";

const userRouter = Express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);