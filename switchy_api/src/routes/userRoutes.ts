import { Request, Response, Router } from "express";
import UserController from "../controllers/userController";

const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/Info", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getInfo(request, response);
});

userRoutes.get("/Info/:userId", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getInfoById(request, response);
});

userRoutes.get("/Search/:query", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.searchUser(request, response);
});

userRoutes.put("/Update", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.update(request, response);
});

userRoutes.put("/Update/Username", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[403] = { description: 'Forbidden.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.updateUsername(request, response);
});

userRoutes.post("/Password/Change", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.changePassword(request, response);
});

userRoutes.post("/Follow", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.follow(request, response);
});

userRoutes.delete("/Unfollow", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.unfollow(request, response);
});

userRoutes.delete("/", (request: Request, response: Response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.delete(request, response);
});

export default userRoutes;
