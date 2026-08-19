

const product = require("../model/productModel");

// ==========================================
// CREATE PRODUCT
// ==========================================

const createProduct = async (req, res) => {
    console.log("========== CREATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("SECTION:", req.body.section);
    console.log("FILE:", req.file);

    try {
        const {
            title,
            brand,
            category,
            description,
            price,
            discount,
            size,
            stock,
            section,
        } = req.body;

        // SECTION REQUIRED
        if (!section) {
            return res.status(400).json({
                success: false,
                message: "Please select a product section",
            });
        }

        // ALLOWED SECTIONS
        const allowedSections = [
            "selling",
            "featured",
            "popular",
        ];

        if (!allowedSections.includes(section)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product section",
            });
        }

        // CREATE PRODUCT
        const newProduct = new product({
            title,
            brand: brand || "",
            category,
            description,
            price: Number(price),
            discount: Number(discount) || 0,
            size,
            stock: Number(stock) || 0,
            section,
            image: req.file
                ? req.file.filename
                : "",
        });

        // SAVE
        const saveProduct = await newProduct.save();

        console.log("PRODUCT SAVED:", saveProduct);
        console.log("SAVED SECTION:", saveProduct.section);

        return res.status(201).json({
            success: true,
            message: "Product successfully created",
            data: saveProduct,
        });

    } catch (error) {
        console.log("Create Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
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
            data: products,
        });

    } catch (error) {
        console.log("Get Products Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GET SELLING PRODUCTS
// ==========================================

const getSellingProducts = async (req, res) => {
    try {
        const products = await product.find({
            section: "selling",
        });

        return res.status(200).json({
            success: true,
            message: "Selling products fetched successfully",
            data: products,
        });

    } catch (error) {
        console.log("Get Selling Products Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GET POPULAR PRODUCTS
// ==========================================

const getPopularProducts = async (req, res) => {
    try {
        const products = await product.find({
            section: "popular",
        });

        return res.status(200).json({
            success: true,
            message: "Popular products fetched successfully",
            data: products,
        });

    } catch (error) {
        console.log("Get Popular Products Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// GET FEATURED PRODUCTS
// ==========================================

const getFeaturedProducts = async (req, res) => {
    try {
        const products = await product.find({
            section: "featured",
        });

        return res.status(200).json({
            success: true,
            message: "Featured products fetched successfully",
            data: products,
        });

    } catch (error) {
        console.log("Get Featured Products Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
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
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: singleProduct,
        });

    } catch (error) {
        console.log("Get Single Product Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
    createProduct,
    getAllProducts,
    getSellingProducts,
    getPopularProducts,
    getFeaturedProducts,
    getSingleProduct,
};