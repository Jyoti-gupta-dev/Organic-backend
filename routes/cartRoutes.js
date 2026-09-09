const express = require("express")
const router = express.Router()
const ProtectRoute=require("../middleware/ProtectRoute")
const {addToCart, getCartsData}=require("../controller/cartController")



router.post("/addtocart",ProtectRoute,addToCart)
router.post("/getCart",ProtectRoute,getCartsData)


module.exports =router;