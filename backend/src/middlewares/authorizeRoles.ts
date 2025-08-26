import {  Response, NextFunction } from "express";

const authorizeRoles = (allowedRoles: string[]) => {
    return (req: any, res: Response, next: NextFunction): void => {
        if (req.user && allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden: Access is denied." });
        }
    };
};

export { authorizeRoles };
