const swaggerAutogen = require('swagger-autogen')()
const port = process.env.PORT
const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes.ts']

swaggerAutogen(outputFile, endpointsFiles, {host: `localhost:3333`})