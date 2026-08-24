
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();


// Connect MongoDB
main().catch((err) => console.log(err));

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
        console.log("DB Name:", mongoose.connection.name);
    } catch (err) {
        console.log("MongoDB Connection Error:", err);
    }
}



app.use(cors({
    origin: ["http://localhost:5173",
        "http://localhost:5174",
        "https://organic-frontend-sigma.vercel.app",
        "https://organic-admin-pink.vercel.app",
    ],
    credentials: true
}));
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