import express from "express";
import {
  getCryptoStats,
  getStandardDeviation,
} from "../controllers/crypto.controllers.js";
import { query } from "express-validator";
const router = express.Router();

const coinValidation = [
  query("coin")
    .isIn(["bitcoin", "ethereum", "matic-network"])
    .withMessage("Invalid coin"),
];

router.get("/stats", coinValidation, getCryptoStats);
router.get("/deviation", coinValidation, getStandardDeviation);
  

export default router;
