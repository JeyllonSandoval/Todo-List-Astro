import type { Request, Response } from 'express';
import userSchema from '../models/User.js';
import bcrypt from 'bcryptjs';

export const registerUser = async(req: Request, res: Response) => {
    const emailExist = await userSchema.findOne({ email: req.body.email });
        if (emailExist) {
            console.log("Email already exists");
            return res.status(400).send('Email already exists');
        }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const user = new userSchema(req.body);
    await user.save();
    res.json(user);
};

export const loginUser = async(req: Request, res: Response) => {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
        console.log("User not found");
        return res.status(400).send('User not found');
    }
    if (user.password !== req.body.password) {
        console.log("Invalid password");
        return res.status(400).send('Invalid password');
    }
    res.json(user);
};

export const getUsers = async(req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    const users = await userSchema.find();
    res.json(users);
};