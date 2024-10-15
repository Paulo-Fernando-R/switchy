"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/sample", (req, res) => {
    res.type("application/json").status(200).send({
        message: "Helloo World",
    });
});
exports.default = router;
