"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.decode(token);
            console.log("Decoded token:", decoded); // Add this to see what's in the token
            const userRole = decoded["custom:role"] || "";
            console.log("Extracted role:", userRole); // Add this to debug role extraction
            req.user = {
                id: decoded.sub,
                role: userRole
            };
            // Log the user object that's being attached to request
            console.log("User object:", req.user);
            // Don't lowercase the role value from the token
            const hasAccess = allowedRoles.includes(userRole);
            if (!hasAccess) {
                res.status(403).json({ message: "Access Denied" });
                return;
            }
            next();
        }
        catch (err) {
            console.error("Failed to decode token:", err);
            res.status(400).json({ message: "Invalid Token" });
            return;
        }
    };
};
exports.authMiddleware = authMiddleware;
