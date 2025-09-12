// src/infrastructure/api/express/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../../auth/jwt.service";

export interface AuthRequest extends Request {
    user?: { id: string; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader){
            res.status(401).json({ error: "No token provided" });
            return;
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded: any = JwtService.verifyToken(token);

        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
};
