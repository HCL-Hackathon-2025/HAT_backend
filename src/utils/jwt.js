import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};
