import CryptoData from "../models/crypto.schema.js";
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
      error: "Something Went Wrong while fetching the stats of cryptocurrency",
    });
  }
}

export { getCryptoStats };
