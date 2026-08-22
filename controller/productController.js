
const product = require("../model/productModel");

// ==========================================
// CREATE PRODUCT
// ==========================================
const createProduct = async (req, res) => {
    try {

        // ================================
        // 1. GET DATA FROM REQUEST
        // ================================

        const {
            title,
            brand,
            sku,
            category,
            description,
            price,
            discount,
            size,
            stock,
            section,
        } = req.body;


       
        // // 2. REQUIRED FIELD VALIDATION
        

        // if (
        //     !title ||
        //     !category ||
        //     !description ||
        //     !price ||
        //     !size
        // ) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Please fill all required fields",
        //     });
        // }


        // ================================
        // 3. IMAGE VALIDATION
        // ================================

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",

            });
        }


       
        // 4. SECTION HANDLE
       

        let productSections = [];

        if (Array.isArray(section)) {
            productSections = section;
        } else if (section) {
            productSections = [section];
        }


       
        // 5. SECTION VALIDATION
    

        if (productSections.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one product section is required",
            });
        }


        // 6. CHECK DUPLICATE SKU
        

        if (sku) {

            const existingProduct = await product.findOne({
                sku: sku.trim(),
            });

            if (existingProduct) {
                return res.status(400).json({
                    success: false,
                    message: "Product with this SKU already exists",
                });
            }
        }


        // ================================
        // 7. CREATE PRODUCT
        // ================================

        const newProduct = new product({

            title: title.trim(),

            brand: brand
                ? brand.trim()
                : "",

            sku: sku
                ? sku.trim()
                : undefined,

            category: category.trim(),

            description: description.trim(),

            price: Number(price),

            discount: discount
                ? Number(discount)
                : 0,

            size: size.trim(),

            stock: stock
                ? Number(stock)
                : 0,

            section: productSections,

            image: req.file.filename,

        });


        // ================================
        // 8. SAVE PRODUCT
        // ================================

        const savedProduct = await newProduct.save();


        // ================================
        // 9. SUCCESS RESPONSE
        // ================================

        return res.status(201).json({

            success: true,

            message: "Product created successfully",

            product: savedProduct,

        });


    } catch (error) {

        console.error(
            "Create Product Error:",
            error
        );


        // ================================
        // DUPLICATE SKU ERROR
        // ================================

        if (error.code === 11000) {

            return res.status(400).json({
                success: false,
                message: "SKU already exists",
            });
        }


        // ================================
        // SERVER ERROR
        // ================================

        return res.status(500).json({

            success: false,

            message: "Failed to create product",

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