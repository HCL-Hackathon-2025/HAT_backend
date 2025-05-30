import {Router} from "express";
import { getStaffList, addStaffMember } from "../controllers/StaffListController.js";

const router = Router();

router.get('/list', getStaffList );
router.post('/add', addStaffMember);

export default router;