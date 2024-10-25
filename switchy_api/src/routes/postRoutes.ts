import { Router } from "express";
import PostController from "../controllers/postController";

const postRoutes = Router();
const controller = new PostController();

postRoutes.post("/CreatePost", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.createPost(req, res);
});

postRoutes.get("/GetFeedPosts", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getFeedPosts(req, res);
});

postRoutes.get("/GetPostById/:postId", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getPostById(req, res);
});

postRoutes.put("/Like", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.putLike(req, res);
});

postRoutes.get("/GetPostsByUserId/:userId", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getUserPosts(req, res);
});

export default postRoutes;
