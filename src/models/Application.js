const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); 
const { customAlphabet } = require("nanoid");


// Generate 6-character alphanumeric ID
const generateAppId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const Application = sequelize.define("Application", {
  application_id: {
    type: DataTypes.STRING(6),
    primaryKey: true,
    defaultValue: () => generateAppId(),
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  job_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_type: {
    type: DataTypes.ENUM("Remote", "Onsite"),
    allowNull: false,
  },
  stipend: {
    type: DataTypes.ENUM("Paid", "Unpaid"),
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Application;
