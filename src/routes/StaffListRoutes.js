import {Router} from "express";
import { getStaffList } from "../controllers/StaffListController.js";

const router = Router();

router.get('/user/list', getStaffList )

export default router;