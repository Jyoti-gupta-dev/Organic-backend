const express = require("express")
const router = express.Router()
const ProtectRoute = require("../middleware/ProtectRoute")
const { addToCart, getCartsData, deleteCart, increaseQuantity,decreaseQuantity } = require("../controller/cartController")



router.post("/addtocart", ProtectRoute, addToCart)
router.post("/getCart", ProtectRoute, getCartsData)
router.post("/deleteCart/:id", ProtectRoute, deleteCart)
router.post("/incQty/:id", ProtectRoute, increaseQuantity)
router.post("/decQty/:id", ProtectRoute, decreaseQuantity)


module.exports = router;