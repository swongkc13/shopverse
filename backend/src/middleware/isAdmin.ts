import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
    if(!req.user){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next();
}
