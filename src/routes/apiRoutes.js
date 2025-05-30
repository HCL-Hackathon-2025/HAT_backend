import { Router } from "express";
import staffListRoutes from './StaffListRoutes.js';
import seedRoutes from './SeedRoutes.js';
import loginRoutes from "./loginRoutes.js"

const router = Router();

router.use('/staff', staffListRoutes);
router.use('/seed', seedRoutes);
router.use('/login', loginRoutes)

export default router;
