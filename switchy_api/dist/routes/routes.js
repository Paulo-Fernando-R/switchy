"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginRoutes_1 = __importDefault(require("./loginRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const postRoutes_1 = __importDefault(require("./postRoutes"));
const express_1 = require("express");
const commentsRoutes_1 = __importDefault(require("./commentsRoutes"));
const jwtMiddleware_1 = require("../middleware/jwtMiddleware");
const router = (0, express_1.Router)();
router.use('/Login', loginRoutes_1.default);
router.use('/User', jwtMiddleware_1.jwtMiddleware, userRoutes_1.default);
router.use('/Post', jwtMiddleware_1.jwtMiddleware, postRoutes_1.default);
router.use('/Comments', jwtMiddleware_1.jwtMiddleware, commentsRoutes_1.default);
exports.default = router;
