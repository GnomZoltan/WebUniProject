import { Router } from "express";
import { RequestHistory } from "../models/request-history.mjs";

const router = Router();

router.get("/", async (req, res) => {
  return res.status(200).send(await RequestHistory.find());
});

export default router;
