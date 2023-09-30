const { connect , sequelise } = require("../dbconfig");
const { Order } = require("../models/order");
const { Address } = require("../models/Adress");
const { User } = require("../models/User");
const { Product } = require("../models/product");
const { orderResponseParser } = require("../parser/orderResponseParser");
const { userResponseParser } = require("../parser/userResponseParser");
const jwt = require("jsonwebtoken");
const { OrderProduct } = require("../models/orderproduct");
exports.OrderController = {
 async create(req,res)
 {
  try {
    const siparisTarihim = new Date();
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { iscredit, adreAddressId, cartItems, totalPrice, orderNote } = req.body;

    const order = await Order.create({
      iscredit :iscredit,
      userId: user.id,
      adreAddressId :adreAddressId,
      totalPrice : totalPrice,
      orderNote : orderNote,
      siparisTarihi : siparisTarihim,
    });

    const orderId = order.orderID;
    console.log(orderId);

    // Create OrderProduct entries
    for (const item of cartItems) {
      await OrderProduct.create({
        orderOrderID: orderId,
        productProductID: item.productID,
        quantity: item.quantity,
        // ... other fields
      });
    }

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating order' });
  }
 }
 ,
 async getOrder(req,res)
 {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user);
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [
        {
          model: OrderProduct,
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          model: Address, // Include the Address model
        },
      ],
    });
    console.log(orders);
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching user orders' });
}
}

};