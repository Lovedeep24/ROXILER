const axios = require('axios');
// Define the API URLs
const barChart_api = 'http://localhost:5000/barChart?month=4';
const pieChart_api = 'http://localhost:5000/pieChart?month=9';
const stats_api = 'http://localhost:5000/stats??month=12&year=2021';

// API to fetch data from all three external APIs
const fetchAll= async (req, res) => {
  try {
    // Fetch data from all three APIs concurrently
    const [response1, response2, response3] = await Promise.all([
      axios.get(barChart_api),
      axios.get(pieChart_api),
      axios.get(stats_api),
    ]);

    // Extract data from the responses
    const data1 = response1.data;
    const data2 = response2.data;
    const data3 = response3.data;

    // Combine the data into a single response
    const combinedData = {
      barChart_Data: data1,
      pieChart_Data: data2,
      stats_Data: data3,
    };

    // Send the combined data as the response
    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching data from APIs:", error);
    res.status(500).json({ message: "Error fetching data from one or more APIs", error: error.message });
  }
};
module.exports = fetchAll;
