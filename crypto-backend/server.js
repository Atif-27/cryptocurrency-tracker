import express from "express";
import connectToDB from "./utils/db.js";
import startCryptoJob from "./jobs/crypto.jobs.js";
import cryptoRouter from "./routes/crypto.routes.js";
import "dotenv/config.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", cryptoRouter);


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