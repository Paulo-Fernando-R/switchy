"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = __importDefault(require("../controllers/loginController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const recoveryEmail_1 = require("../services/smtp/recoveryEmail");
const loginRoutes = (0, express_1.Router)();
const controller = new loginController_1.default();
const userController = new userController_1.default();
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
loginRoutes.post("/ResetPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[403] = { description: 'Forbidden.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    const smtp = new recoveryEmail_1.RecoveryEmail();
    yield smtp.sendEmail("teste@teste.com", "message");
    res.status(200).send();
}));
loginRoutes.post("/Password/Recovery", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Login']
    // #swagger.responses[200] = { description: 'Ok.' }
    // #swagger.responses[400] = { description: 'Bad Request.' }
    // #swagger.responses[404] = { description: 'Not Found.' }
    // #swagger.responses[500] = { description: 'Internal Server Error.' }
    userController.recoveryPassword(req, res);
}));
exports.default = loginRoutes;
