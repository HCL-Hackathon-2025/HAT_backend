import { Router } from "express";
const router = Router();
import { createSeeders } from "../seeders/index.js";

router.get('/create', createSeeders);

export default router;