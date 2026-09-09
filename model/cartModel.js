const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    },
    quantity: {
        type: Number,
        default: 1

    }
})

const cart = mongoose.model("cart", cartSchema)
module.exports = cart