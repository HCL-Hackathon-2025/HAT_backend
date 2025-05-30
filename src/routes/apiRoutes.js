import { Router } from "express";
import staffListRoutes from './StaffListRoutes.js';
import seedRoutes from './SeedRoutes.js';
import loginRoutes from "./loginRoutes.js";
import { TokenAnalyzer } from "../middleware/AuthMiddlewares.js";

const router = Router();

router.use('/staff', TokenAnalyzer ,staffListRoutes);
router.use('/seed', TokenAnalyzer ,seedRoutes);
router.use('/login', loginRoutes)

export default router;
