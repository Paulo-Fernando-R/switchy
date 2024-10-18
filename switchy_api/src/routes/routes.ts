import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import { Router } from "express";

const router = Router();

router.use(userRoutes);
router.use(loginRoutes);
router.use(postRoutes);
export default router;
