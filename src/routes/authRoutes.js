import express from "express";
import { Staff } from "../models/Staff.js";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../utils/jwt.js";

const router = express.Router();

//  Signup API
router.post("/signup", async (req, res) => {
    const { fullname, email, password } = req.body;

    const existingStaff = await Staff.findOne({ where: { email } });
    if (existingStaff) return res.status(400).json({ message: "User already exists" });

    const user = await Staff.create({ fullname, email, password });
    res.status(201).json({ token: generateToken(user), refreshToken: generateRefreshToken(user) });
});

//  Login API
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await Staff.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ token: generateToken(user), refreshToken: generateRefreshToken(user) });
});

//  Logout API
router.post("/logout", (req, res) => {
    res.json({ message: "Logout successful" });
});

//  Refresh Token API
router.post("/refresh", (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(403).json({ message: "Refresh token required" });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        res.json({ token: generateToken(user) });
    });
});

export default router;
