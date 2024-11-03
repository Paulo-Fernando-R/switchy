import express from "express";
import cors from "cors";
import router from "./routes/routes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
