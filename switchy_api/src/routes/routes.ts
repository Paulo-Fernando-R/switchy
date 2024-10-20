import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import { Router } from "express";
import commentsRoutes from "./commentsRoutes";
import { jwtMiddleware } from "../middleware/jwtMiddleware";

const router = Router();

router.use('/Login', loginRoutes);
router.use('/User', jwtMiddleware, userRoutes);
router.use('/Post', jwtMiddleware, postRoutes);
router.use('/Comments', jwtMiddleware, commentsRoutes);

export default router;
