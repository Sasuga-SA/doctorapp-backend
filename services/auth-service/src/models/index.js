import sequelize from '../config/database.js';
import { Doctor } from './doctor.model.js';

Doctor.initModel(sequelize);

const models = {
  Doctor,
};

const syncDb = async () => {
  await sequelize.sync({ alter: true });
  console.log("📦 Modelos sincronizados con la base de datos");
};

export { sequelize , syncDb };
export default models;
