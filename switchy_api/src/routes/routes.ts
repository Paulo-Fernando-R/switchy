import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import { Router } from "express";
import commentsRoutes from "./commentsRoutes";

const router = Router();

router.use(userRoutes);
router.use(loginRoutes);
router.use(postRoutes);
router.use(commentsRoutes);
export default router;
