const express = require("express")
const router = express.Router();
const { userSignup, userLogin,getSingleUser,getAllUser } = require("../controller/userController")

router.post("/signup", userSignup)
router.post("/login", userLogin)
router.get("/getSingleUser/:id", getSingleUser)
router.get("/getAllUsers",getAllUser)


module.exports = router