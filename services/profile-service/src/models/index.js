import sequelize from "../config/database.js";
import { Profile } from "./profile.model.js";

Profile.initModel(sequelize);

const models = {
  Profile,
};

const syncDb = async () => {
  await sequelize.sync({ force: true });
  console.log("📦 Profile models synchronized with database");
};

export { sequelize, syncDb };
export default models; 