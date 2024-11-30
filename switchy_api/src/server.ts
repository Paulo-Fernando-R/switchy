//@ts-ignore
import swaggerFile from "../swagger_output.json";
import swaggerUi from "swagger-ui-express";
import app from "./app";
import "dotenv/config";
import { getServerIp } from "./utils/esServerIp";

const PORT = process.env.PORT;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(PORT, () => {
    console.warn(`Application is running: http://${getServerIp()}:${PORT}/swagger`);
});
