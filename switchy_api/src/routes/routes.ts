import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import { Router } from "express";

const router = Router();

router.use(userRoutes);
router.use(loginRoutes);
export default router;
