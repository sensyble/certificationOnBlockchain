const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./model/userModel");
const router = require("./routes/userRoutes");
require("dotenv").config()

const app = express();

// Middleware
app.use(express.json())
app.use(cors());
app.use("/api", router)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("database done")}).catch((error)=>{console.log(error)});

// Start the server
app.listen(4000, () => {
  console.log(`Server is running on port 4000`);
});
