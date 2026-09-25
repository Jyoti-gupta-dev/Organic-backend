const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("rtrtr", process.env.RAZORPAY_KEY_ID)


const createOrder = async (req, res) => {
    console.log("amount", req.body)

    try {
        const options = {
            amount: 50000, // ₹500 → amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        console.log("RAZORPAY ORDER:", order)

        res.status(200).json({
            success: true,
            order,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        console.log(error)
    }

}
const verifyPayment = async (req, res) => {
    const { paymentId } = req.body

    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (payment.status === "captured") {
            return res.status(200).json({
                success: true,
                message: "payment successful",
                payment,
            });
        }
        return res.status(400).json({
            success: false,
            message: "payment failed"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}




module.exports = { createOrder, verifyPayment }