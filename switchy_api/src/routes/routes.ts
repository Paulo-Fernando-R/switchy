import userRoutes from "./userRoutes";
import { Router } from "express";

const router = Router();

router.use(userRoutes);
export default router;
