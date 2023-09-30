
const {DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const Address = sequelise.define('adres', {
    addressId : {
        primaryKey : true,
        autoIncrement : true,
        type:DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    description : DataTypes.STRING,
    province : DataTypes.STRING,
    district : DataTypes.STRING
  },
  {
    timestamps : false
  })
exports.Address =Address