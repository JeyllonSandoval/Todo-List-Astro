import type { Response, NextFunction } from 'express';

export const auth = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    if (token !== process.env.TOKEN) {
        return res.status(403).json({msg: 'Invalid token, authorization denied'});
    }
    req['admin'] = true;
    next();
};