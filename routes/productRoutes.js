const express = require("express")
const router = express.Router();
const { createProduct,getAllProducts,getSingleProduct } = require("../controller/productController")
const upload=require("../middleware/upload")




// image upload
router.post(
    "/createProduct",
    upload.single("image"),
    createProduct
);




router.get("/getAllProducts",upload.single("image"), getAllProducts)
router.post("/createProducts",createProduct)
// GET SINLGE PRODUCT

// router.delete("/deleteProduct/:id", deleteProduct)
// router.put("/updateProduct/:id", updateProduct)
  router.get("/getSingleProduct/:id",getSingleProduct)



module.exports = router;