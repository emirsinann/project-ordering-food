const { ProductController } = require("../controller/ProductController");
const { productValidator } = require("../validators/productValidator");


const router = require("express").Router();

router.post("/",productValidator,ProductController.create)
router.get("/",ProductController.getAllProduct)
//router.get("/:id",AddressController.getAddress)
//router.put("/:id",AddressController.update)
//router.delete("/:id",AddressController.delete)


module.exports = router