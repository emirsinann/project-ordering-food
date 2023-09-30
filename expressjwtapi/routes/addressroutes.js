const { AddressController } = require("../controller/AddressController");
const { addressValidator } = require("../validators/addressValidator");
const { updateAddressValidator } = require("../validators/updateAddressValidator");

const router = require("express").Router();

router.post("/",addressValidator,AddressController.create)
router.get("/",AddressController.getAddress)
router.put("/",AddressController.update)
router.delete("/",AddressController.delete)


module.exports = router