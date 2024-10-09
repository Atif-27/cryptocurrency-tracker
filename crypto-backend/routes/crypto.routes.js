import express from "express";
import {
  getCryptoStats,
  getStandardDeviation,
} from "../controllers/crypto.controllers.js";
const router = express.Router();

router.get("/stats", getCryptoStats);
router.get("/deviation", getStandardDeviation);
  

export default router;
