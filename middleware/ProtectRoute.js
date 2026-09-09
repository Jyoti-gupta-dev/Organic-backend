// const jwt=require("jsonwebtoken")
// const User = require("../model/userModel")

// const ProtectRoute = async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer")) {
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
//             if (decoded) {
//                 let result = await User.findOne({ _id: decoded.userId });
//                 req.user = result;
//                 next();
//             } else {
//                 console.log("err", err);
//                 next();
//             }
//         });
//         if (!token) {
//             res.status({
//                 status: false,
//                 msg: "token missing",
//             });
//             throw new Error("User is not authorized or token is missing");
//         }
//     } else {
//         // res.status({
//         //     status: false,
//         //     msg: "something wrong",
//         // });
//         return res.status(401).json({
//     status: false,
//     msg: "something wrong"
// });
//     }
// };

// module.exports = ProtectRoute

// const jwt = require("jsonwebtoken");
// const User = require("../model/userModel");

// const protectRoute = async (req, res, next) => {
//     try {
//         const authHeader =
//             req.headers.authorization || req.headers.Authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Access denied. Token missing.",
//             });
//         }

//         const token = authHeader.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token missing.",
//             });
//         }

//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_SECRET_KEY
//         );

//         console.log("DECODED:", decoded);

//         const user = await User.findById(decoded.userId);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found.",
//             });
//         }

//         req.user = user;

//         console.log("REQ.USER:", req.user);

//         next();

//     } catch (error) {
//         console.log("JWT ERROR:", error.message);

//         return res.status(401).json({
//             success: false,
//             message: "Invalid or expired token.",
//         });
//     }
// };

// module.exports = protectRoute;

const jwt = require("jsonwebtoken");

const ProtectRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = ProtectRoute;