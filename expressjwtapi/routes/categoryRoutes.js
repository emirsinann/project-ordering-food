
const { CategoryController } = require("../controller/CategoryController");
const { categoryValidator } = require("../validators/categoryValidator");

const router = require("express").Router();

router.post("/",categoryValidator,CategoryController.create)
router.get("/:id",CategoryController.getCategory)
module.exports = router