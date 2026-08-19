
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        // ================= PRODUCT BASIC INFORMATION =================

        title: {
            type: String,
            required: true,
            trim: true,
        },

        brand: {
            type: String,
            default: "",
            trim: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            default: "",
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        // ================= PRICING =================

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

        // ================= SIZE / QUANTITY =================

        size: {
            type: String,
            required: true,
            trim: true,
        },

        // ================= INVENTORY =================

        stock: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ================= PRODUCT IDENTIFICATION =================

        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        // ================= PRODUCT IMAGE =================

        image: {
            type: String,
            default: "",
        },

        // ================= PRODUCT STATUS =================

        isActive: {
            type: Boolean,
            default: true,
        },

        // ================= PRODUCT RATING =================

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        // ================= REVIEW COUNT =================

        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ================= PRODUCT SECTION =================
        // Best Selling  -> selling
        // Featured      -> featured
        // Popular       -> popular

        section: {
            type: String,
            enum: ["selling", "featured", "popular"],
            required:true,
        },
    },
    {
        timestamps: true,
    }
);

const product = mongoose.model("product", productSchema);

module.exports = product;