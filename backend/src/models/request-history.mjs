import mongoose from "mongoose";

const requestHistorySchema = new mongoose.Schema({
  method: String,
  url: String,
  headers: Object,
  body: Object,
  query: Object,
  params: Object,
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
