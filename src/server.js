import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
});
