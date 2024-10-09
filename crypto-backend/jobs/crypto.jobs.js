import CryptoData from "../models/crypto.schema.js";
import axios from "axios";
import cron from "node-cron";
//! Cron Job to update data every 2 hours
export default async function startCryptoJob() {
  runCryptoJob();
  cron.schedule("0 */2 * * *", runCryptoJob);
}

async function runCryptoJob() {
  try {
    console.log("Running crypto data fetch job...");
    const coinIds = "bitcoin,matic-network,ethereum";
    const response = await axios.get(
      `${process.env.COINGECKO_API_URL}?ids=${coinIds}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );
    const data = response.data;
    if (data) {
      const coins = ["bitcoin", "matic-network", "ethereum"];
      coins.forEach(async (coin) => {
        const newData = new CryptoData({
          coin: coin,
          price: data[coin].usd,
          marketCap: data[coin].usd_market_cap,
          change24h: data[coin].usd_24h_change,
        });
        await newData.save();
      });
    }
  } catch (error) {
    console.log("Something Went Wrong:", error);
  }
}