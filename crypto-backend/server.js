import express from "express";
import connectToDB from "./utils/db.js";
import startCryptoJob from "./jobs/crypto.jobs.js";
const app = express();
const PORT = process.env.PORT || 5000;



async function init() {
  try {
    await connectToDB();
    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    await startCryptoJob();
  } catch (error) {
    console.log("Failed To start the server");
  }
}
init();