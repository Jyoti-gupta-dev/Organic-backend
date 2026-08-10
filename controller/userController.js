const User = require("../model/userModel")


//USERSIGNuP

const userSignup = async (req, res) => {
    console.log(req.body)

    try {

        const { name, email, phone, password } = req.body;
        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }
        const user = await User.create({
            name,
            email,
            phone,
            password,
        })
        res.status(201).json({
            success: true,
            message: "Signup successfull",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,

            },
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

//USERLOGIN

const userLogin = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "incorrect password"
            })
        }
        res.status(200).json({
            success: true,
            message: "Login successfull",
            user: {
                email: user.email,
                password: user.password,
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};

//SINGLEUSER

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                success: false,
                message: "user not Found",

            });
        }
        res.status(200).json({
            success: true,
            message: "user fetched successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET ALL USERS

const getAllUser = async (req, res) => {
    //console.log("getAllUser Api hit");
    try {

        const users = await User.find();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



module.exports = { userSignup, userLogin, getSingleUser, getAllUser }