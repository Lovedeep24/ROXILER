const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id:{type:Number},
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: String,
    imageUrl: String,
    sold:  Boolean,
    dateOfSale: Date,
});

module.exports = mongoose.model("Product", productSchema);
