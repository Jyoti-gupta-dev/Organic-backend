
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        // ==========================================
        // BASIC PRODUCT INFORMATION
        // ==========================================

        title: {
            type: String,
           // required: true,
            trim: true,
        },

        brand: {
            type: String,
            default: "",
            trim: true,
        },

        category: {
            type: String,
            // required: true,
            trim: true,
        },

        type: {
            type: String,
            default: "",
            trim: true,
        },

        description: {
            type: String,
            // required: true,
            trim: true,
        },

        // ==========================================
        // PRICING
        // ==========================================

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        // ==========================================
        // SIZE / UNIT
        // ==========================================

        size: {
            type: String,
            // required: true,
            trim: true,
        },

        // ==========================================
        // INVENTORY
        // ==========================================

        stock: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ==========================================
        // PRODUCT IDENTIFICATION
        // ==========================================

        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        // ==========================================
        // PRODUCT IMAGE
        // ==========================================

        image: {
            type: String,
            default: "",
        },

        // ==========================================
        // PRODUCT STATUS
        // ==========================================

        isActive: {
            type: Boolean,
            default: true,
        },

        // ==========================================
        // PRODUCT RATING
        // ==========================================

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        // ==========================================
        // REVIEW COUNT
        // ==========================================

        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ==========================================
        // PRODUCT SECTIONS
        // ==========================================
        // A product can be in multiple sections
        //
        // selling  = Best Selling
        // featured = Featured Products
        // popular  = Popular Products

        section: {
            type: [
                {
                    type: String,
                    enum: ["selling", "featured", "popular"],
                },
            ],
            required: true,
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length > 0;
                },
                message: "At least one product section is required",
            },
        },
    },
    {
        timestamps: true,
    }
);

const product = mongoose.model("product", productSchema);

module.exports = product;