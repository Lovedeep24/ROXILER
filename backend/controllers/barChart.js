const Product = require('../models/product');  // Import the Product model

const barChart = async (req, res) => {
  try {
    const { month } = req.query;
   
    const startOfMonth = new Date("2021-09-01T00:00:00.000Z");
    const endOfMonth = new Date("2021-09-30T23:59:59.999Z");
    console.log("Start of month:", startOfMonth);
    console.log("End of month:", endOfMonth);
    

    const products = await Product.find({});
 
    // If no products are found, return an empty array
    if (products.length === 0) {
      return res.json([]);
    }

    // Group products by price ranges
    const priceRanges = await Product.aggregate([
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
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ["$price", 100] }, then: "0-100" },
                { case: { $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }] }, then: "101-200" },
                { case: { $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }] }, then: "201-300" },
                { case: { $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }] }, then: "301-400" },
                { case: { $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }] }, then: "401-500" },
                { case: { $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }] }, then: "501-600" },
                { case: { $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }] }, then: "601-700" },
                { case: { $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }] }, then: "701-800" },
                { case: { $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }] }, then: "801-900" },
              ],
              default: "901-above",
            },
          },
          count: { $sum: 1 },  // Count products in each price range
        },
      },
      {
        $project: {
          _id: 0,
          range: "$_id",
          count: 1,
        },
      },
    ]);
    
    // Send the grouped data as the response
    res.json(priceRanges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = barChart;
