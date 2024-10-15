import app from "./app";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
//@ts-ignore
import swaggerFile from "../swagger_output.json";

const PORT = process.env.PORT;

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(PORT, () => {
    console.warn(`Application is running: http://localhost:${PORT}/swagger`);
});
