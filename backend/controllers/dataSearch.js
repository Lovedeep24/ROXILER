const Product=require("../models/product");
const dataSearch=async (req, res) => { 
    try {
      // Extract query parameters, with default values for pagination
      const { search = '', page = 1, perPage = 10 } = req.query;
  
      // Create a filter based on search text if provided
      let filter = {};

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      
        // Convert search to a number and check if it’s finite
        const searchNumber = Number(search);
        if (Number.isFinite(searchNumber)) {
          filter.$or.push({ price: searchNumber });
        }
      }
  
      // Calculate pagination parameters
      const skip = (page - 1) * perPage;
      const limit = parseInt(perPage);
  
      // Fetch matching transactions with pagination
      const transactions = await Product.find(filter).skip(skip).limit(limit);
  
      // Get total count for pagination
      const totalCount = await Product.countDocuments(filter);
  
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / perPage);
  
      res.json({
        data: transactions,
        pagination: {
          totalCount,
          totalPages,
          currentPage: parseInt(page),
          perPage: limit,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = dataSearch;