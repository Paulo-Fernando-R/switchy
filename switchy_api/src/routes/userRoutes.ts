import { Request, Response, Router } from "express";
import UserController from "../controllers/userController";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/NewUser", controller.newUser);


userRoutes.get("/GetById", (request: Request, response: Response) => {
    // #swagger.tags = ['GetById']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getUserById(request, response);
});


export default userRoutes;
