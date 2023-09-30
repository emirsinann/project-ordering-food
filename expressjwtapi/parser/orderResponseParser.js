const { Order } = require("../models/order")

exports.orderResponseParser = (order) =>{
    return {
        orderID : order.orderID,
        iscredit : order.iscredit
    }
}