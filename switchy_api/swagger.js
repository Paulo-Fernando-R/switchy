const swaggerAutogen = require("swagger-autogen")();
const { getServerIp } = require("./src/utils/moduleServerIp");
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/routes.ts"];

const doc = {
    info: {
        title: "Switchy API",
    },
    host: `${getServerIp()}:3333`,
    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            in: "header",
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
