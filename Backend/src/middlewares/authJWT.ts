import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Roles';

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({msg: 'No token, authorization denied'});
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.id;
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({msg: 'User not found'});
        }
        console.log(user);
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token is not valid'});
    }
};

export const verifyModerator = async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({msg: 'User not found'});
    }
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            console.log('moderator');
            next();
            return;
        }
    }
    return res.status(403).json({msg: 'Require Moderator Role'});
}

export const verifyAdmin = async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);
    if (!user) {
        return res.status(404).json({msg: 'User not found'});
    }
    const roles = await Role.find({_id: {$in: user.roles}});
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            console.log('admin');
            next();
            return;
        }
    }
    return res.status(403).json({msg: 'Require Admin Role'});
};
