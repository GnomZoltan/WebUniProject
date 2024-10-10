import { Router } from "express";
import authRouter from "./auth.mjs";
import userRouter from "./user.mjs";
import solveRouter from "./algorithms.mjs";
import historyRouter from "./request-history.mjs";
import authenticateJWT from "../middlewares/verify-jwt.mjs";
import logRequest from "../middlewares/log-request.mjs";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);

router.use(authenticateJWT);
router.use(logRequest);
router.use("/api/solve", solveRouter);
router.use("/api/history", historyRouter);

export default router;
