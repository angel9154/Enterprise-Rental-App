import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            }
        }
    }
}

export const authMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization?.split(' ')[1];
       
        if (!token) {
             res.status(401).json({ message: "Unauthorized" });
             return;
        }
        try {
            const decoded = jwt.decode(token) as DecodedToken;
            console.log("Decoded token:", decoded); // Add this to see what's in the token
            
            const userRole = decoded["custom:role"] || "";
            console.log("Extracted role:", userRole); // Add this to debug role extraction
            
            req.user = {
                id: decoded.sub,
                role: userRole
            }
            
            // Log the user object that's being attached to request
            console.log("User object:", req.user);
    
            // Don't lowercase the role value from the token
            const hasAccess = allowedRoles.includes(userRole);
            if (!hasAccess) {
                res.status(403).json({ message: "Access Denied" });
                return;
            }
            next();
        } catch (err) {
            console.error("Failed to decode token:", err);
            res.status(400).json({ message: "Invalid Token" });
            return;
        }
    } 
}