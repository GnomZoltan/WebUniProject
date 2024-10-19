import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  method: { type: String, required: true },
  coefficients: { type: Array, required: true },
  results: { type: Array, required: true },
  status: { type: String, default: "pending" },
  output: { type: Object, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", taskSchema);
