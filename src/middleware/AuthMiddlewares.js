import jwt from "jsonwebtoken";

export const TokenAnalyzer = (req, res, next) => {
    
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}