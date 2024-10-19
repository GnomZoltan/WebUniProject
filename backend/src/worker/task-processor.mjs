import { Worker } from "worker_threads";
import { Task } from "../models/task.mjs";
import path from "path";
import { fileURLToPath } from "url";

// Визначаємо __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function processTask(taskId) {
  try {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    await task.save();

    const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

    const worker = new Worker(path.resolve(__dirname, "./worker.mjs"), {
      workerData: {
        coefficients: deepCopy(task.coefficients),
        results: deepCopy(task.results),
        method: task.method,
      },
    });

    worker.on("message", async (message) => {
      if (message.status === "solving_equations") {
        task.status = "solving-equations";
      } else if (message.status === "calculating_complexity") {
        task.status = "calculating-complexity";
        task.output = {
          result: message.result,
        };
      } else if (message.status === "success") {
        task.output = {
          result: message.result,
          complexity: message.complexity,
        };
        task.status = "completed";
      } else if (message.status === "error") {
        task.output = { error: message.error };
        task.status = "failed";
      }
      await task.save();
    });

    worker.on("error", async (err) => {
      task.status = "failed";
      task.output = { error: err.message };
      await task.save();
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  } catch (error) {
    const task = await Task.findById(taskId);
    if (task) {
      task.status = "failed";
      task.output = { error: error.message };
      await task.save();
    }
  }
}
