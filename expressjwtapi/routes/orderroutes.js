const { OrderController } = require("../controller/OrderController");
const { orderValidator } = require("../validators/orderValidator");
const router = require("express").Router();

router.post("/",orderValidator,OrderController.create)
router.get("/",OrderController.getOrder)


module.exports = router