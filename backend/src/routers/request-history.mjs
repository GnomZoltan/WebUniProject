import { Router } from "express";
import { RequestHistory } from "../models/request-history.mjs";
import resolveHistoryById from "../middlewares/resolve-history-by-id.mjs";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const refreshToken = req.cookies["jwt-refresh"];
    const claims = jwt.verify(
      refreshToken,
      "process.env.JWT_SECRET_REFRESH_KEY"
    );

    if (!claims) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const userId = claims._id;

    const history = await RequestHistory.find({ user: userId }).sort({
      timestamp: -1,
    });

    return res.status(200).send(history);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error fetching request history", error: err });
  }
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
