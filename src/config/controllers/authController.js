import Staff from "../models/MedicalStaff.js";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../utils/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Staff.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            token: generateToken(user),
            refreshToken: generateRefreshToken(user),
        });
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
};
