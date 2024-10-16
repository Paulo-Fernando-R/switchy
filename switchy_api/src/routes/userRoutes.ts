import { Router } from "express";
import jwtMiddleware from "../middleware/jwtMiddleware";
import UserController from "../controllers/userController";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/NewUser", controller.newUser);

userRoutes.get("/GetById", jwtMiddleware.veryfyJWT, controller.getUserById);

userRoutes.get("/Test2/:id", (req, res) => {
    const id = req.params.id;
    res.send(id);
});

export default userRoutes;
