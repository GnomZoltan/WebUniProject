import { Router } from "express";
import { Task } from "../models/task.mjs";
import { processTask } from "../worker/task-processor.mjs";

const router = Router();

router.get("/status/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send({ message: "Task not found" });

    res.status(200).send({
      status: task.status,
      result: task.output?.result || null,
      complexity: task.output?.complexity || null,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch task status", error: error.message });
  }
});

router.post("/cancel/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).send({ message: "Task not found" });

    task.status = "canceled";
    await task.save();

    res.status(200).send({ message: "Task canceled successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Failed to cancel task",
      error: error.message,
    });
  }
});

router.post("/jakobi", async (req, res) => {
  const { coefficients, results } = req.body;

  try {
    const task = await Task.create({
      method: "jacobi",
      coefficients,
      results,
    });

    processTask(task._id);

    res
      .status(202)
      .send({ message: "Task started", taskId: task._id, status: task.status });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

router.post("/cramer", async (req, res) => {
  const { coefficients, results } = req.body;

  try {
    const task = await Task.create({
      method: "cramer",
      coefficients,
      results,
    });

    processTask(task._id);

    res
      .status(202)
      .send({ message: "Task started", taskId: task._id, status: task.status });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

router.post("/gauss", async (req, res) => {
  const { coefficients, results } = req.body;

  try {
    const task = await Task.create({
      method: "gauss",
      coefficients,
      results,
    });

    processTask(task._id);

    res
      .status(202)
      .send({ message: "Task started", taskId: task._id, status: task.status });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create task",
      error: error.message,
    });
  }
});

export default router;
