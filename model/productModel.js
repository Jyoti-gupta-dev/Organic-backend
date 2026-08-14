// // const mongoose=require ("mongoose")

// // const productSchema=new mongoose.Schema({
// //      title: String,
// //     brand: String,
// //     category: String,
// //     type: String,
// //     description:String,
// //     price:String,
// //     discount: String,
// //     size: String,
// //     sku: String,
// //     image: String
// // });
// // const product=mongoose.model("product",productSchema);



// // module.exports =product;


// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//     {
//         // Product Basic Information
//         title: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         brand: {
//             type: String,
//             default: "",
//             trim: true
//         },

//         category: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         type: {
//             type: String,
//             default: "",
//             trim: true
//         },

//         description: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         // Pricing
//         price: {
//             type: Number,
//             required: true,
//             min: 0
//         },

//         discount: {
//             type: Number,
//             default: 0,
//             min: 0,
//             max: 100
//         },

//         // Product Quantity / Size
//         size: {
//             type: String,
//             required: true,
//             trim: true
//         },

//         // Inventory
//         stock: {
//             type: Number,
//             default: 0,
//             min: 0
//         },

//         // Product Identification
//         sku: {
//             type: String,
//             unique: true,
//             sparse: true,
//             trim: true
//         },

//         // Product Image
//         image: {
//             type: String,
//             default: ""
//         },

//         // Product Status
//         isActive: {
//             type: Boolean,
//             default: true
//         },

//         // Product Rating
//         rating: {
//             type: Number,
//             default: 0,
//             min: 0,
//             max: 5
//         },

//         // Number of Reviews
//         reviewCount: {
//             type: Number,
//             default: 0,
//             min: 0
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// const product = mongoose.model("product", productSchema);

// module.exports = product;
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        // Product Basic Information
        title: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            default: "",
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            default: "",
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        // Pricing
        price: {
            type: Number,
            required: true,
            min: 0
        },

        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        // Product Quantity / Size
        size: {
            type: String,
            required: true,
            trim: true
        },

        // Inventory
        stock: {
            type: Number,
            default: 0,
            min: 0
        },

        // Product Identification
        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        // Product Image
        image: {
            type: String,
            default: ""
        },

        // Product Status
        isActive: {
            type: Boolean,
            default: true
        },

        // Product Rating
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        // Number of Reviews
        reviewCount: {
            type: Number,
            default: 0,
            min: 0
        },

        // ⭐ Product Sections
        sections: {
            type: [String],
            enum: ["selling", "featured", "popular"],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const product = mongoose.model("product", productSchema);

module.exports = product;