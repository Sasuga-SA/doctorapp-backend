import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import routes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (profile pictures)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v1", routes);

export default app; 