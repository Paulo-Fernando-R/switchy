"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentsController_1 = __importDefault(require("../controllers/commentsController"));
const commentsRoutes = (0, express_1.Router)();
const controller = new commentsController_1.default();
commentsRoutes.post("/Add", (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.add(req, res);
});
commentsRoutes.get("/ByPost/:postId", (req, res) => {
    // #swagger.tags = ['Comments']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[401] = { description: 'Unauthorized.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getByPost(req, res);
});
exports.default = commentsRoutes;
