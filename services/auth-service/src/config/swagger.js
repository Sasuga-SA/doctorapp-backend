import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description: "Documentación de la API de autenticación de doctores",
    },
    servers: [
      {
        url: "http://localhost:4001/api/v1", // cambia si usas otra ruta base
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"], // ajusta las rutas si es necesario
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
