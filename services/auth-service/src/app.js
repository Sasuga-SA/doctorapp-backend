import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";


//import swaggerUi from "swagger-ui-express";
//import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
