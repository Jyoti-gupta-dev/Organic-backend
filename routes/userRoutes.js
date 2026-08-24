const express = require("express")
const router = express.Router();
const { userSignup, userLogin,getSingleUser,getAllUser,updateUser,deleteUser,Profile } = require("../controller/userController")
const ProtectRoute=require("../middleware/ProtectRoute")
router.post("/signup", userSignup)
router.post("/login", userLogin)
router.get("/getSingleUser/:id", getSingleUser)
router.get("/getAllUsers",getAllUser)
router.put("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)
router.post("/Profile",ProtectRoute,Profile)

module.exports = router

