import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
            req.userID = decoded.id;
        } else {
            return res.status(401).json({ message: "Invalid token format" });
        }
        
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}