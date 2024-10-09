import CryptoData from "../models/crypto.schema.js";
import { std } from "mathjs";
import { validationResult } from "express-validator";
import { AppError } from "../utils/error.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const getCryptoStats = asyncWrapper(async (req, res, next) => {
  // Validate the query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());

    throw new AppError(errors.array()[0].msg, 400);
  }
  const { coin } = req.query;
  const data = await CryptoData.findOne({ coin }).sort({ createdAt: -1 });
  if (!data) {
    throw new AppError("Data not found", 404);
  }
  res.status(200).json({
    price: data.price,
    marketCap: data.marketCap,
    "24hChange": data.change24h,
  });
});

const getStandardDeviation = asyncWrapper(async (req, res, next) => {
  // Validate the query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError(errors.array()[0].msg, 400);
  }
  const { coin } = req.query;
  const records = await CryptoData.find({ coin })
    .sort({ createdAt: -1 })
    .limit(100);

  if (records.length === 0) {
    throw new AppError("Insufficient data", 404);
  }

  const prices = records.map((record) => record.price);
  const deviation = std(prices);

  res.json({
    deviation: deviation.toFixed(2),
  });
});

export { getCryptoStats, getStandardDeviation };
