import dotenv from "dotenv";
const env = process.env.NODE_ENV;
dotenv.config({
    path: env?.includes("development") ? ".env.dev" : ".env.prod",
});

//@ts-ignore
import swaggerFile from "../swagger_output.json";
import { getServerIp } from "./utils/esServerIp";
import swaggerUi from "swagger-ui-express";
import app from "./app";

const PORT = process.env.PORT;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(PORT, () => {
    console.warn(`Application is using variables from: ${process.env.FILE} env file - NODE_ENV: ${env}`);
    console.warn(`Application is running: http://${getServerIp()}:${PORT}/swagger`);
});
