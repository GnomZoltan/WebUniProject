import { Router } from "express";
import {
  solveByJacobi,
  solveByCramer,
  solveByGauss,
} from "../services/slae-algorithms.mjs";

const router = Router();

router.post("/jakobi", (req, res) => {
  const result = solveByJacobi(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });

  res.status(200).send(result);
});

router.post("/cramer", (req, res) => {
  const result = solveByCramer(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });

  res.status(200).send(result);
});

router.post("/gauss", (req, res) => {
  const result = solveByGauss(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });

  res.status(200).send(result);
});

export default router;
