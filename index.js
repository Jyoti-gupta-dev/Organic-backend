
// const express = require("express");
// const cors = require("cors")
// const app = express();

// const mongoose = require("mongoose");


// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage });

// // Connect MongoDB Database
// main().catch((err) => console.log(err));
// async function main() {

//     // Connect to MongoDB Atlas
//     await mongoose.connect(
//         "mongodb://jyotigupta:developer2026@ac-vefzhvy-shard-00-00.ybpqktq.mongodb.net:27017,ac-vefzhvy-shard-00-01.ybpqktq.mongodb.net:27017,ac-vefzhvy-shard-00-02.ybpqktq.mongodb.net:27017/users?ssl=true&replicaSet=atlas-4gafsj-shard-0&authSource=admin&appName=Cluster0"
//     );

//     // Database connected successfully
//     console.log("Database Connected");

//     // Print current database name
//     console.log("DB Name:", mongoose.connection.name);
// }

// // Middleware to accept JSON data
// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// // Default Route
// app.get("/", (req, res) => {
//     res.json({
//         message: "Server Created Successfully",
//     });
// });

// // Admin Routes
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/Products", require("./routes/productRoutes"))

// // Start Server
// app.listen(5000, () => {
//     console.log("Server Running on Port 5000");
// });
// module.exports = upload;



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();


// Connect MongoDB
main().catch((err) => console.log(err));

async function main() {

    await mongoose.connect(
        "mongodb://jyotigupta:developer2026@ac-vefzhvy-shard-00-00.ybpqktq.mongodb.net:27017,ac-vefzhvy-shard-00-01.ybpqktq.mongodb.net:27017,ac-vefzhvy-shard-00-02.ybpqktq.mongodb.net:27017/users?ssl=true&replicaSet=atlas-4gafsj-shard-0&authSource=admin&appName=Cluster0"
    );

    console.log("Database Connected");
    console.log("DB Name:", mongoose.connection.name);
}


// Middleware
app.use(cors({
    origin: ["https://organic-frontend-sigma.vercel.app", "https://localhost:5173"]
}
));
app.use(express.json());


// Image folder
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/Products", require("./routes/productRoutes"));


// Default route
app.get("/", (req, res) => {
    res.json({
        message: "Server Created Successfully"
    });
});


// Server
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});