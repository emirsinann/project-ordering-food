
const {DataTypes } = require("sequelize");
const { sequelise } = require("../dbconfig");

const Order = sequelise.define('orders', {
    orderID : {
        primaryKey : true,
        autoIncrement : true,
        type:DataTypes.INTEGER
    },
    iscredit:{
       type:  DataTypes.BOOLEAN,
       allowNull : false
    },
    totalPrice: DataTypes.INTEGER,
    siparisTarihi : DataTypes.DATE,
    orderNote : DataTypes.STRING,
    
  },
  {
    timestamps : false
  })
  //async()
  //await order.sync({ force: true });
  //console.log("The table for the Order model was just (re)created!");
exports.Order =Order