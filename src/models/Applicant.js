const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); 
const { customAlphabet } = require("nanoid");
const generateAppId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);


const Applicant= sequelize.define("Applicant",{
request_id:{
    type: DataTypes.STRING(5),
        primaryKey: true,
        defaultValue: () => generateAppId()
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
application_id : {
   type: DataTypes.STRING(6),
   allowNull: false,
   references :{
    model : "Applications",
    key : "application_id"
   },
   onDelete: "CASCADE",
},
is_approved : {
    type : DataTypes.BOOLEAN,
    defaultValue : false,
}

})

module.exports = Applicant;