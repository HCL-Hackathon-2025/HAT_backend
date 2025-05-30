const express = require('express');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const { generateToken, generateRefreshToken } = require('../utils/jwt');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length > 0) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
            [fullname, email, hashedPassword]
        );

        res.status(201).json({ token: generateToken(newUser.rows[0]), refreshToken: generateRefreshToken(newUser.rows[0]) });
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) return res.status(404).json({ message: "User not found" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ token: generateToken(user), refreshToken: generateRefreshToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
});

module.exports = router;
