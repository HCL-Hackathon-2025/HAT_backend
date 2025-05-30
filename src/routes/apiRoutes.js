import { Router } from "express";
import staffListRoutes from './StaffListRoutes.js';
import seedRoutes from './SeedRoutes.js';

const router = Router();

router.use('/staff', staffListRoutes);
router.use('/seed', seedRoutes);

export default router;
