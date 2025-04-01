const {Sequelize} = require("sequelize");    
require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: true,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.DB_CERTIFICATE
    }
}
})

const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("PostgreSQL DB Connected");
    } catch (error) {
      console.error("Database Connection Error:", error.message);
    }
  };

  module.exports = { sequelize, connectDB };