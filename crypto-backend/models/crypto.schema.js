import mongoose from "mongoose";

//! schema of crypto data which is stored
const cryptoDataSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("cryptodata", cryptoDataSchema);
