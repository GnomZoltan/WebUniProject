import { Router } from "express";
import { RequestHistory } from "../models/request-history.mjs";
import resolveHistoryById from "../middlewares/resolve-history-by-id.mjs";

const router = Router();

router.get("/", async (req, res) => {
  return res.status(200).send(await RequestHistory.find());
});

router.delete("/:id", resolveHistoryById, async (req, res) => {
  const { historyItem } = req;

  try {
    await RequestHistory.findByIdAndDelete(historyItem._id);
    return res.sendStatus(200);
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Error deleting request history", error: err });
  }
});

export default router;
