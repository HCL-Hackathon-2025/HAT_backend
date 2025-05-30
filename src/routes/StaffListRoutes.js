import {Router} from "express";
import { getStaffList } from "../controllers/StaffListController.js";

const router = Router();

router.get('/list', getStaffList )

export default router;