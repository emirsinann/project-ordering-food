
const {DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const Category = sequelise.define('categorys', {
    categoryID : {
        primaryKey : true,
        autoIncrement : true,
        type:DataTypes.INTEGER
    },
    name : DataTypes.STRING
  },
  {
    timestamps : false
  })
  //async()
  //await order.sync({ force: true });
  //console.log("The table for the Order model was just (re)created!");
exports.Category =Category