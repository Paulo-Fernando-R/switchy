import { Router } from "express";
import CommentsController from "../controllers/commentsController";
import jwtMiddleware from "../middleware/jwtMiddleware";

const commentsRoutes = Router();
const controller = new CommentsController();

commentsRoutes.post("/Comments/Add", jwtMiddleware.veryfyJWT, (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.add(req, res);
});

commentsRoutes.get("/Comments/ByPost/:postId", jwtMiddleware.veryfyJWT, (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getByPost(req, res);
});

export default commentsRoutes;