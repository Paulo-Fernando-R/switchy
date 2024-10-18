import { Router } from "express";
import LoginController from "../controllers/loginController";

const loginRoutes = Router();
const controller = new LoginController();

loginRoutes.post("/Login/SignIn", (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'User Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.signIn(req, res);
});

export default loginRoutes;