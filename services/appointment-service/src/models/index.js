import sequelize from '../config/database.js'; 


const syncDb = async () => {
  try {
    await sequelize.sync({ alter: true }); // o { force: true } en desarrollo
    console.log('✅ Sequelize models synced');
  } catch (err) {
    console.error('❌ Error syncing DB:', err);
  }
};

export default syncDb;
