import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description: "Doctor authentication API documentation",
    },
    servers: [
      {
        url: "http://localhost:4001/api/v1", // change if you use a different base route
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // adjust paths if necessary
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
