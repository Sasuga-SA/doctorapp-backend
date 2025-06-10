import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

try {
  await sequelize.authenticate();
  console.log('🟢 Database connected successfully');
} catch (error) {
  console.error('🔴 Unable to connect to the database:', error);
}

export default sequelize;
