const Product = require("../models/product");

const statistics = async (req, res) => {
  try {
    // Extract the month from the query parameters
    const { month } = req.query;
    const selectedMonth = month ? parseInt(month) : new Date().getMonth() + 1; // Default to current month if not provided

    // Find all sold transactions within the selected month, ignoring the year part
    const transactions = await Product.find({
      sold: true,
      // Matching only the month part of the dateOfSale
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    });

    // Calculate the total sale amount for the selected month
    const totalSaleAmount = transactions.reduce((total, product) => total + product.price, 0);

    // Count the total sold items in the month
    const totalSoldItems = transactions.length;

    // Count the total items not sold in the selected month
    const totalNotSoldItems = await Product.countDocuments({
      sold: false,
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    });

    // Return the statistics response
    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = statistics;
