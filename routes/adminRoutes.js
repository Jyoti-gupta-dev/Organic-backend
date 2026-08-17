const express = require("express");

const router = express.Router();
const { adminLogin, registerAdmin, singleAdmin, getAllAdmin } = require("../controller/adminController");
const upload = require("../middleware/upload")

router.post("/login", adminLogin);
router.post("/register", upload.single("image"), registerAdmin)
router.get("/singleadmin/:id", singleAdmin)
router.get("/getAllAdmin", getAllAdmin)


module.exports = router;
