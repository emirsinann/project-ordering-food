
const {DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const User = sequelise.define('users', {
    id : {
        primaryKey : true,
        autoIncrement : true,
        type:DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    password:DataTypes.STRING,
    contact : {
        type:DataTypes.STRING,
        allowNull:true
    },
    email:DataTypes.STRING,

  },
  {
    timestamps : false
  })
exports.User =User