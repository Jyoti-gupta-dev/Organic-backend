// const product = require("../model/productModel");

// //CREATE PRODUCT

// const createProduct = async (req, res) => {
//     console.log(req.file);
//     console.log(req.body)
//     try {
//         console.log(req.body)

//         const { title, brand, category, type, description, price, discount, size, sku, image } = req.body

//         // const newProduct = new product({
//         //     title,
//         //     brand,
//         //     category,
//         //     type,
//         //     description,
//         //     price,
//         //     discount,
//         //     size,
//         //     sku,
//         //     image: req.file ? req.file.filename : ""
//         // });

//         const newProduct = new product({
//     title,
//     brand,
//     category,
//     type,
//     description,
//     price,
//     discount,
//     size,
//     sku,
//     stock: req.body.stock || 0,
//     image: req.file ? req.file.filename : "",
// });

//         const saveProduct = await newProduct.save()
//         if (!saveProduct) {
//             return res.json({ mesaage: "product not created", status: false });
//         }
//         return res.json({
//             message: "product successfully created",
//             status: true,
//             data: saveProduct
//         });

//     } catch (error) {
//         return res.json({
//             message: "server error",
//             status: false,
//             error: error.message
//         });

//     }
// };

// //get All Product

// const getAllProducts = async (req, res) => {
//     try {
//         const products = await product.find();


//         res.status(200).json({
//             success: true,
//             message: "Products fetched succesfully",
//             data: products
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: false,
//             message: error.message,
//         })

//     }

// };
// //GET SINGLE PRODUCT

// const getSingleProduct = async (req, res) => {
//     try {
//         const SingleProduct = await product.findById(req.params.id);


//         res.status(200).json({
//             success: true,
//             message: "product fetched succesfully",
//             data: SingleProduct
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: (error.message)
//         });

//     }

// };

// module.exports = { createProduct, getAllProducts,getSingleProduct }



const product = require("../model/productModel");

// ==========================================
// CREATE PRODUCT
// ==========================================

const createProduct = async (req, res) => {

    console.log("File:", req.file);
    console.log("Body:", req.body);

    try {

        const {
            title,
            brand,
            category,
            description,
            price,
            discount,
            size,
            stock
        } = req.body;


        const newProduct = new product({

            title,

            brand: brand || "",

            category,

            description,

            price,

            discount: discount || 0,

            size,

            stock: stock || 0,

            image: req.file ? req.file.filename : ""

        });


        const saveProduct = await newProduct.save();


        if (!saveProduct) {

            return res.status(400).json({
                message: "Product not created",
                status: false
            });

        }


        return res.status(201).json({

            message: "Product successfully created",

            status: true,

            data: saveProduct

        });


    } catch (error) {

        console.log("Create Product Error:", error);

        return res.status(500).json({

            message: "Server error",

            status: false,

            error: error.message

        });

    }

};


// ==========================================
// GET ALL PRODUCTS
// ==========================================

const getAllProducts = async (req, res) => {

    try {

        const products = await product.find();

        return res.status(200).json({

            success: true,

            message: "Products fetched successfully",

            data: products

        });

    } catch (error) {

        console.log("Get Products Error:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

const getSingleProduct = async (req, res) => {

    try {

        const singleProduct = await product.findById(req.params.id);


        if (!singleProduct) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }


        return res.status(200).json({

            success: true,

            message: "Product fetched successfully",

            data: singleProduct

        });

    } catch (error) {

        console.log("Get Single Product Error:", error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct
};