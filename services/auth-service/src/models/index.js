import sequelize from "../config/database.js";
import { User } from "./user.model.js";

User.initModel(sequelize);

const models = {
  User,
};

const syncDb = async () => {
  await sequelize.sync({ force: true });
  console.log("📦 Models synchronized with database");
};

export { sequelize, syncDb };
export default models;
