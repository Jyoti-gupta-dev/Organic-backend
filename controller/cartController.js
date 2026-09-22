const Cart = require("../model/cartModel")
const Product = require("../model/productModel")

const addToCart = async (req, res) => {

    console.log(req.body)
    console.log("user", req.user)
    try {

        const cartdata = new Cart({
            item: req.body.id,
            user: req.user.userId
        })

        const saveData = await cartdata.save()
        res.json({ message: saveData })


    } catch (error) {
        res.json({ error: error })
    }
}



const getCartsData = async (req, res) => {
    console.log(req.user)
    try {

        const userId = req.user.userId
        console.log(userId)

        const userCartData = await Cart.find({ user: userId }).populate("item")
        res.json({ data: userCartData })

    } catch (error) {
        res.json({ error: error })

    }
}

//DELETE CARTPRODUCT

const deleteCart = async (req, res) => {
    const { id } = req.params
    console.log("idddd", id)
    try {
        const deleteCart = await Cart.deleteOne({ _id: id })
        console.log(deleteCart)
        if (deleteCart.deletedCount === 1) {
            res.status(200).json({
                success: true,
                message: "item deleted successfully from your cart"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "cart item not found"
            })
        }

    } catch (error) {
        console.log(error.message)
        res.staus(500).json({
            success: false,
            message: error
        })
    }
}


//increase Quantity
const increaseQuantity = async (req, res) => {
    try {
        // const id = req.body.id
        // console.log(id)
        const { id } = req.params
        console.log("idd", id)

        const singleData = await Cart.findByIdAndUpdate({ _id: id })
        console.log(singleData.quantity)

        singleData.quantity += 1;

        const updateQty = await singleData.save()
        res.json(({ message: updateQty, status: true }))

    } catch (error) {
        console.log(error.message)
        res.json({ error: error })

    }
}



//DECREASE QUANTITY

const decreaseQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("dec", id)

        const singleData = await Cart.findByIdAndUpdate({ _id: id })
        console.log("singleData.quantity:", singleData.quantity)

        if (singleData.quantity > 1) {
            singleData.quantity -= 1;

            const updateQty = await singleData.save();
            res.json({
                message: updateQty,
                status: true
            })
        } else {
            res.json({
                message: "quantity can not be less than 1",
                status: false

            })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ error: error })

    }
}


module.exports = { addToCart, getCartsData, deleteCart, increaseQuantity, decreaseQuantity };