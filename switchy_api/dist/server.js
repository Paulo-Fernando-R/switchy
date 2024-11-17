"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const swagger_output_json_1 = __importDefault(require("../swagger_output.json"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const PORT = process.env.PORT;
app_1.default.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app_1.default.listen(PORT, () => {
    console.warn(`Application is running: http://localhost:${PORT}/swagger`);
});
