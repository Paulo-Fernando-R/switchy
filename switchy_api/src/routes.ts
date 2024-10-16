import { Router, Request, Response } from "express";
import DatabaseConnection from "./infra/database/databaseConnection";

const router = Router();

router.get("/sample", async (req, res) => {
    const connection = new DatabaseConnection();
    const client = await connection.connect();
    const db = client.db(connection.dbName);
    const collection = db.collection("movies");
    const list = await collection.find({ year: 1999 }).toArray();
    connection.disconnect();

    res.type("application/json").status(200).send({
        message: list,
    });
});

export default router;
