import { Router } from "express";
import { login } from "../controllers/LoginControllers.js";

const router = Router();

router.post("/", login )

export default router;