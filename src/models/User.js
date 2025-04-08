const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Application = require("./Application");
 
const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "recruiter", "admin"),
      defaultValue: "student",
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }    
  }, {
    timestamps: true,
  });
  
  User.hasMany(Application, { foreignKey: "user_id", onDelete: "CASCADE" });
  Application.belongsTo(User, { foreignKey: "user_id" });
  
  module.exports=User;
