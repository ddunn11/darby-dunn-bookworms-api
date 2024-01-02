import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "My API",
    description: "API Documentation",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./src/docs/swagger-output.json"; // The output file path
const endpointsFiles = ["./src/index.ts"]; // Path to the file that contains your routes

swaggerAutogen(outputFile, endpointsFiles, doc);
