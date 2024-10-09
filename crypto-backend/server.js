import express from "express";
import connectToDB from "./utils/db.js";
import rateLimit from "express-rate-limit";
import startCryptoJob from "./jobs/crypto.jobs.js";
import cryptoRouter from "./routes/crypto.routes.js";
import cors from "cors";
import "dotenv/config.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  })
);
app.get("/", (req, res) => {
  res.json({
    message: "API Working",
  });
});

app.use("/api", cryptoRouter);

//! Error Handling Middleware
app.use(errorHandler);
async function init() {
  try {
    await connectToDB();
    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    await startCryptoJob();
  } catch (error) {
    console.log("Failed To start the server", error);
  }
}
init();