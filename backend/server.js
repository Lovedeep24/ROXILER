const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

const connectToMongoDb = require("./config/db");
const authRoute=require("./routes/authRoutes");
// const cors=require("cors");
// const mongoose = require("mongoose");
// const axios = require("axios");
// const Product = require("./models/Product"); // Import the model created above
dotenv.config();
const app=express();
// app.use(cors());
app.use(express.json());

const PORT=process.env.PORT;

// Configure CORS to allow requests from your frontend
app.use(cors()); // This allows all origins

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  
    connectToMongoDb()
    .then(() => {
        console.log('Connected to MongoDB');
  
    })
  });
  app.use("",authRoute);
