import CryptoData from "../models/crypto.schema.js";
import { std } from "mathjs";
import { validationResult } from "express-validator";

async function getCryptoStats(req, res) {
  // Validate the query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { coin } = req.query;
    const data = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({
      price: data.price,
      marketCap: data.marketCap,
      "24hChange": data.change24h,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Something Went Wrong while fetching the stats of cryptocurrency",
      error,
    });
  }
}

async function getStandardDeviation(req, res) {
  // Validate the query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { coin } = req.query;
    const records = await CryptoData.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: "Insufficient data" });
    }

    const prices = records.map((record) => record.price);
    const deviation = std(prices);

    res.json({
      deviation: deviation.toFixed(2),
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Something Went Wrong while fetching the standard deviation of cryptocurrency",
      error,
    });
  }
}

export { getCryptoStats, getStandardDeviation };
