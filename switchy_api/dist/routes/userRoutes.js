"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRoutes = (0, express_1.Router)();
const controller = new userController_1.default();
userRoutes.get("/Info", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getInfo(request, response);
});
userRoutes.get("/Info/:userId", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.getInfoById(request, response);
});
userRoutes.get("/Search/:query", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    return controller.searchUser(request, response);
});
userRoutes.put("/Update", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.update(request, response);
});
userRoutes.put("/Update/Username", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[403] = { description: 'Forbidden.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.updateUsername(request, response);
});
userRoutes.post("/Password/Change", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.changePassword(request, response);
});
userRoutes.post("/Follow", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.follow(request, response);
});
userRoutes.delete("/Unfollow", (request, response) => {
    // #swagger.tags = ['User']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    controller.unfollow(request, response);
});
exports.default = userRoutes;
