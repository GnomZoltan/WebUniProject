import { Router } from "express";
import { User } from "../models/user.mjs";
import authenticateJWT from "../middlewares/verify-jwt.mjs";
import logRequest from "../middlewares/log-request.mjs";

const router = Router();

router.use(authenticateJWT);
router.use(logRequest);
router.get("/", async (req, res) => {
  return res.status(200).send(await User.find());
});

export default router;
