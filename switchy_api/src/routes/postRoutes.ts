import { Router } from "express";
import PostController from "../controllers/postController";
import jwtMiddleware from "../middleware/jwtMiddleware";

const postRoutes = Router();
const controller = new PostController();

//!Mudar parametro para pegar do token depois

postRoutes.post("/CreatePost/", jwtMiddleware.veryfyJWT, (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.createPost(req, res);
});

export default postRoutes;
