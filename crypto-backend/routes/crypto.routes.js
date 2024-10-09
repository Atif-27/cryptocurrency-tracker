import express from "express";
import { getCryptoStats } from "../controllers/crypto.controllers.js";
const router = express.Router();

router.get("/stats", getCryptoStats);

export default router;
