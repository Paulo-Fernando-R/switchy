import { Router } from "express";
import CommentsController from "../controllers/commentsController";

const commentsRoutes = Router();
const controller = new CommentsController();

commentsRoutes.post("/Add", (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.add(req, res);
});

commentsRoutes.get("/ByPost/{postId}", (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getByPost(req, res);
});

export default commentsRoutes;