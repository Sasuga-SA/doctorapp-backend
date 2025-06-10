import "dotenv/config";
import sequelize from './config/database.js';

import app from "./app.js";
import syncDb from './models/index.js';

const PORT = process.env.PORT || 4001;

(async () => {
  try {
    await sequelize.authenticate();
    await syncDb(); // 👈 aquí centralizas
    app.listen(PORT, () =>
      console.log(`🩺 Appointment-Service en http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err);
    process.exit(1);
  }
})();
