
const product = require("../model/productModel");

// ==========================================
// CREATE PRODUCT
// ==========================================

const createProduct = async (req, res) => {
    console.log("========== CREATE PRODUCT ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
        const {
            title,
            brand,
            category,
            type,
            description,
            price,
            discount,
            size,
            stock,
            sku,
            section,
        } = req.body;

        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (!title || !category || !description || !price || !size) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required product fields",
            });
        }

        // ==========================================
        // SECTION
        // ==========================================

        let productSections = section;

        /*
          FormData se section kabhi string ke form me
          aa sakta hai:
    
          "selling"
    
          ya JSON string:
    
          '["selling","featured"]'
        */

        if (typeof productSections === "string") {
            try {
                productSections = JSON.parse(productSections);
            } catch {
                productSections = [productSections];
            }
        }

        // Safety
        if (!Array.isArray(productSections)) {
            productSections = [productSections];
        }

        // Empty section check
        if (productSections.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please select at least one product section",
            });
        }

        // ==========================================
        // ALLOWED SECTIONS
        // ==========================================

        const allowedSections = [
            "selling",
            "featured",
            "popular",
        ];

        const invalidSection = productSections.some(
            (item) => !allowedSections.includes(item)
        );

        if (invalidSection) {
            return res.status(400).json({
                success: false,
                message: "Invalid product section",
            });
        }

        // Remove duplicate sections
        productSections = [...new Set(productSections)];

        // ==========================================
        // CREATE PRODUCT
        // ==========================================

        const newProduct = new product({
            title: title.trim(),

            brand: brand?.trim() || "",

            category: category.trim(),

            type: type?.trim() || "",

            description: description.trim(),

            price: Number(price),

            discount: Number(discount) || 0,

            size: size.trim(),

            stock: Number(stock) || 0,

            sku: sku?.trim() || undefined,

            image: req.file
                ? req.file.filename
                : "",

            section: productSections,

            // These will automatically use schema defaults
            // rating: 0
            // reviewCount: 0
            // isActive: true
        });

        // ==========================================
        // SAVE
        // ==========================================

        const savedProduct = await newProduct.save();

        console.log("PRODUCT SAVED:", savedProduct);

        return res.status(201).json({
            success: true,
            message: "Product successfully created",
            data: savedProduct,
        });

    } catch (error) {
        console.log("Create Product Error:", error);

        // Duplicate SKU
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "SKU already exists. Please use a different SKU.",
            });
        }

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