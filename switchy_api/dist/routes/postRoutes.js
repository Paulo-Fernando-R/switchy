"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const postRoutes = (0, express_1.Router)();
const controller = new postController_1.default();
postRoutes.post("/CreatePost", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.createPost(req, res);
});
postRoutes.get("/GetFeedPosts/:page", (req, res) => {
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
postRoutes.get("/GetPostsByUserId/:userId/:page", (req, res) => {
    // #swagger.tags = ['Post']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getUserPosts(req, res);
});
exports.default = postRoutes;
