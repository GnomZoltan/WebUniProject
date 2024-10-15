import mongoose from "mongoose";

const requestHistorySchema = new mongoose.Schema({
  description: { type: String, required: true },
  outputResult: { type: Object, required: true },
  outputComplexity: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const RequestHistory = mongoose.model(
  "RequestHistory",
  requestHistorySchema
);
