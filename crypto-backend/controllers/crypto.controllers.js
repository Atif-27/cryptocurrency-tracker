import CryptoData from "../models/crypto.schema.js";
import { std } from "mathjs";
async function getCryptoStats(req, res) {
  try {
    const { coin } = req.query;
    const data = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({
      message: "Successfully Fetched Cryptocurrency stats",
      data: {
        price: data.price,
        marketCap: data.marketCap,
        "24hChange": data.change24h,
      },
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
    message: "Successfully Fetched Standard Deivation of Cryptocurrency",
    data: { deviation: deviation.toFixed(2) },
  });
}

export { getCryptoStats, getStandardDeviation };
