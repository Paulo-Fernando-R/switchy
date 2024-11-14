import { Router } from "express";
import LoginController from "../controllers/loginController";
import UserController from "../controllers/userController";
import { Smtp } from "../services/smtp/smtp";

const loginRoutes = Router();
const controller = new LoginController();
const userController = new UserController();

loginRoutes.post("/SignIn", (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'User Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.signIn(req, res);
});

loginRoutes.post("/SignUp", (request, response) => {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[460] = { description: 'Invalid Email.' }
    // #swagger.responses[461] = { description: 'Invalid Username.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return userController.signUp(request, response);
});

loginRoutes.post("/RefreshToken", (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[403] = { description: 'Forbidden.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.refreshToken(req, res);
});

loginRoutes.post("/ResetPassword", async (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[403] = { description: 'Forbidden.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    const smtp = new Smtp();
    await smtp.sendEmail(
        "jonh@doe.com",
        "Subject",
        "message"
    );
     res.status(200).send();
});

export default loginRoutes;
