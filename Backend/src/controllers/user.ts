import type { Request, Response } from 'express';
import userSchema from '../models/User.js';

export const registerUser = async(req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    if (!req.body.username) {
        console.log("Username can not be empty");
        return res.status(400).send('Username can not be empty');
    }
    if (!req.body.email) {
        console.log("Email can not be empty");
        return res.status(400).send('Email can not be empty');
    }
    if (!req.body.password) {
        console.log("Password can not be empty");
        return res.status(400).send('Password can not be empty');
    }
    const user = new userSchema(req.body);
    await user.save();
    res.json(user);
};

export const loginUser = async(req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.body);
    if (!req.body.email) {
        console.log("Email can not be empty");
        return res.status(400).send('Email can not be empty');
    }
    if (!req.body.password) {
        console.log("Password can not be empty");
        return res.status(400).send('Password can not be empty');
    }
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