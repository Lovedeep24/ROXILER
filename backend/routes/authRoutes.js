const express = require("express");
const dataInsertion = require("../controllers/dataInsertion");
const productSearch = require("../controllers/dataSearch");
const statistics = require("../controllers/statistics");
const barChart=require("../controllers/barChart");
const pieChart=require("../controllers/pieChart");
const fetchAll=require("../controllers/fetchAll");
const router = express.Router();

router.post("/dataInsertion", dataInsertion);
router.get("/search-item", productSearch);
router.get("/stats", statistics);
router.get("/barChart", barChart);
router.get("/pieChart", pieChart);
router.get("/fetch-all", fetchAll);
module.exports = router;
