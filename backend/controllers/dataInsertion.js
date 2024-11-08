const axios=require('axios');
const Product=require('../models/product');
const dataInsertion=async(req,res)=>{
    try {
        const response=await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        const productsData=response.data;
        // console.log(productsData);
        const products=await Product.insertMany(productsData);
        res.status(200).json({products});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

module.exports=dataInsertion;