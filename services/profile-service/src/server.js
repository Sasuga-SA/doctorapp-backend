import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { sequelize, syncDb } from "./models/index.js";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 4001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads", "profiles");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

(async () => {
  try {
    await sequelize.authenticate();
    await syncDb();
    app.listen(PORT, () =>
      console.log(`👤 Profile-Service running on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
})(); 