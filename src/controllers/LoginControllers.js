import { models } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../db/connection.js";

const { STAFF } = models;

export const login = async(req, res) => {
    try {
        // Simulate login logic
        const { email, password } = req.body;
        
        const staff = await STAFF.findOne({
            where: {
                email: email 
            }
        });
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, staff.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }


        const token = jwt.sign(
            { email: staff.email, role: staff.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // refresh token logic can be added here if needed
        const refreshToken = jwt.sign(
            { email: staff.email, role: staff.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            refreshToken: refreshToken,
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}