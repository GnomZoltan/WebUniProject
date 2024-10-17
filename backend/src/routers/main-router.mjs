import { Router } from "express";
import authRouter from "./auth.mjs";
import userRouter from "./user.mjs";
import solveRouter from "./algorithms.mjs";
import historyRouter from "./request-history.mjs";
import authenticateJWT from "../middlewares/verify-jwt.mjs";
import logRequest from "../middlewares/log-request.mjs";

const router = Router();

router.use("/api/auth", authRouter);

router.use(authenticateJWT);
router.use("/api/history", historyRouter);
router.use("/api/user", userRouter);
router.use(logRequest);
router.use("/api/solve", solveRouter);

export default router;
