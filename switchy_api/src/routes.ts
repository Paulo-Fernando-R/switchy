import { Router, Request, Response } from "express";

const router = Router();

router.get("/sample", (req, res) => {
    res.type("application/json").status(200).send({
        message: "Helloo World",
    });
});

export default router;
