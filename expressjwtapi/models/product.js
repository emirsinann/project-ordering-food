
const {DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const Product = sequelise.define('products', {
    productID : {
        primaryKey : true,
        autoIncrement : true,
        type:DataTypes.INTEGER
    },
    name : DataTypes.STRING,
    price : DataTypes.INTEGER,
    image : DataTypes.STRING,
    explanation : DataTypes.STRING
    
  },
  {
    timestamps : false
  })
  //async()
  //await order.sync({ force: true });
  //console.log("The table for the Order model was just (re)created!");
exports.Product =Product