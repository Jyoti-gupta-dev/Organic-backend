const product = require("../model/productModel");

//CREATE PRODUCT

const createProduct = async (req, res) => {
    console.log(req.file);
    console.log(req.body)
    try {
        console.log(req.body)

        const { title, brand, category, type, description, price, discount, size, sku, image } = req.body

        const newProduct = new product({
            title,
            brand,
            category,
            type,
            description,
            price,
            discount,
            size,
            sku,
            image: req.file ? req.file.filename : ""
        });

        const saveProduct = await newProduct.save()
        if (!saveProduct) {
            return res.json({ mesaage: "product not created", status: false });
        }
        return res.json({
            message: "product successfully created",
            status: true,
            data: saveProduct
        });

    } catch (error) {
        return res.json({
            message: "server error",
            status: false,
            error: error.message
        });

    }
};

//get All Product

const getAllProducts = async (req, res) => {
    try {
        const products = await product.find();


        res.status(200).json({
            success: true,
            message: "Products fetched succesfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        })

    }

};
//GET SINGLE PRODUCT

const getSingleProduct = async (req, res) => {
    try {
        const SingleProduct = await product.findById(req.params.id);


        res.status(200).json({
            success: true,
            message: "product fetched succesfully",
            data: SingleProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error.message)
        });

    }

};

module.exports = { createProduct, getAllProducts,getSingleProduct }