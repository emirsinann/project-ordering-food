const {Sequelize} = require('sequelize');



const sequelise = new Sequelize('projectexpress','root','root',{
    dialect :"mysql",
    host :"localhost"
})

function init() {
    sequelise.sync({
        force : true
    }).then(res => {
        console.log("Database baglantısı kuruldu")
    }).catch(err => console.log("Errors",err))
}
async function connect()
{
    try{
        await sequelise.authenticate();
        console.log('Connection has been established succesfully');
    } catch(error){
        console.error('Unable to connect to the database',error);
    }
}
function close()
{
    sequelise.close();
}


exports.sequelise = sequelise;

exports.connect = connect;
exports.close = close;
exports.init= init;
const {User} = require('./models/User')
const { Address } = require('./models/Adress');
const { Order } = require('./models/order');
const { OrderProduct } = require('./models/orderproduct');
const { Product } = require('./models/product');
const { Category } = require('./models/category');

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

Address.hasMany(Order);
Order.belongsTo(Address);