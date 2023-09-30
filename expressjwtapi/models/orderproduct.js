
const {DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const OrderProduct = sequelise.define('order_product', {
    opID : {
        primaryKey : true,
        autoIncrement : true,
        type:DataTypes.INTEGER
    },
    quantity : DataTypes.INTEGER,
  },
  
  {
    timestamps : false
  })
  //async()
  //await order.sync({ force: true });
  //console.log("The table for the Order model was just (re)created!");
exports.OrderProduct =OrderProduct