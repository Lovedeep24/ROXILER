const Product = require('../models/product');  // Import the Product model

const pieChart = async (req, res) => {
  try {
    const { month } = req.query;
   
    const startOfMonth = new Date("2021-09-01T00:00:00.000Z");
    const endOfMonth = new Date("2021-09-30T23:59:59.999Z");

    // Log the start and end of the month to ensure they're correct
    console.log("Start of month:", startOfMonth);
    console.log("End of month:", endOfMonth);

    // Query the products based on the date range (ignoring the year)
    const products = await Product.find({
      dateOfSale: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

 
    // console.log("Products found:", products);

    // If no products are found, return an empty array
    if (products.length === 0) {
      return res.json([]);
    }

    // Group products by category and count the number of items in each category
    const categoryCounts = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$category",  // Group by the category field
          count: { $sum: 1 },  // Count the number of items in each category
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",  // Rename _id to category
          count: 1,
        },
      },
    ]);

    // Log the category counts to check the result of the aggregation
    console.log("Category Counts:", categoryCounts);

    // Send the grouped data as the response
    res.json(categoryCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = pieChart;
