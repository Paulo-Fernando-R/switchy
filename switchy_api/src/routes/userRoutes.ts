import { Request, Response, Router } from "express";
import UserController from "../controllers/userController";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/NewUser", controller.newUser);

userRoutes.get("/Info", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getInfo(request, response);
});

userRoutes.get("/Search/:query", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.searchUser(request, response);
});

userRoutes.put('/Update', (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.update(request, response);
});

userRoutes.post('/Password/Change', (request: Request, response: Response) => {
    // #swagger.tags = ['PasswordChange']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.changePassword(request, response);
})

export default userRoutes;
