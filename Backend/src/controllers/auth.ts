import { json, type Request, type Response } from 'express';
import userSchema from '../models/User.js';
import roleSchema from '../models/Roles';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async(req: Request, res: Response) => {
    const emailExist = await userSchema.findOne({ email: req.body.email });
    if (emailExist) {
        console.log("Email already exists");
        return res.status(400).send('Email already exists');
    }
    
    const usernameExist = await userSchema.findOne({ username: req.body.username });
    if (usernameExist) {
        console.log("Username already exists");
        return res.status(400).send('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    if (req.body.roles) {
        const foundRoles = await roleSchema.find({name: {$in: req.body.roles}});
        req.body.roles = foundRoles.map(role => role._id);
    } else {
        const role = await roleSchema.findOne({name: "public"});
        req.body.roles = [role._id];
    } 

    const user = new userSchema(req.body);
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
    });
    res.json(token);
};

export const loginUser = async(req: Request, res: Response) => {
    const user = await userSchema.findOne({ email: req.body.email}).populate("roles");
    if (!user) {
        console.log("User not found");
        return res.status(400).send('User not found');
    }
    const matchPassword = await userSchema.comparePassword(req.body.password, user.password);
    if (!matchPassword) {
        return res.status(400).send({token: null, message: "Invalid Password"});
    }
    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 86400 // 24 hours
    });
    res.json(token);
};

export const getUsers = async(req: Request, res: Response) => {
    const users = await userSchema.find();
    res.json(users); 
};