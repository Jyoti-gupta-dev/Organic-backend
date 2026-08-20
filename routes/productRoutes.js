// const express = require("express")
// const router = express.Router();
// const { createProduct,getAllProducts,getSingleProduct } = require("../controller/productController")
// const upload=require("../middleware/upload")




// // image upload
// router.post(
//     "/createProduct",
//     upload.single("image"),
//     createProduct
// );




// router.get("/getAllProducts", getAllProducts)
// //router.post("/createProducts",createProduct)
// // GET SINLGE PRODUCT

// // router.delete("/deleteProduct/:id", deleteProduct)
// // router.put("/updateProduct/:id", updateProduct)
//   router.get("/getSingleProduct/:id",getSingleProduct)



// module.exports = router;

const express = require("express");
const router = express.Router();

const { createProduct, getAllProducts, getSellingProducts, getPopularProducts, getFeaturedProducts, getSingleProduct } = require("../controller/productController");

const upload = require("../middleware/upload");
const ProtectRoute = require("../middleware/ProtectRoute")


// CREATE PRODUCT
router.post("/createProduct", upload.single("image"), createProduct);

// GET ALL PRODUCTS
router.get("/getAllProducts", ProtectRoute, getAllProducts);

// GET SELLING PRODUCTS
router.post("/selling", getSellingProducts);

// GET POPULAR PRODUCTS
router.post("/popular", getPopularProducts);

// GET FEATURED PRODUCTS
router.post("/featured", getFeaturedProducts);

// GET SINGLE PRODUCT

router.get("/getSingleProduct/:id", getSingleProduct);


// ==========================================
// FUTURE
// ==========================================

// router.delete("/deleteProduct/:id", deleteProduct);
//router.put("/updateProduct/:id", updateProduct);


module.exports = router;