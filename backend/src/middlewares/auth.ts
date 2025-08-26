import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    // Extract token from cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized: Token not provided" });
        return;
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string || "secret");
        // console.log(decoded);
        (req as any).user = decoded; 
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
        return;
    }
};

export { authenticate };
