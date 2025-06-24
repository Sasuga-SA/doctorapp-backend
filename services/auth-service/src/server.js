import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { sequelize, syncDb } from "./models/index.js";

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    await syncDb();
    app.listen(PORT, () =>
      console.log(`🩺 Auth-Service corriendo en http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("❌ Error al iniciar el servidor:", err);
    process.exit(1);
  }
})();
