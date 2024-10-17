import { Router } from "express";
import {
  solveByJacobi,
  solveByCramer,
  solveByGauss,
} from "../services/slae-algorithms.mjs";
import { calculateComplexity } from "../services/complexity-openai.mjs";
import { jakobi, cramer, gauss } from "../services/openaiFunctions.mjs";

const router = Router();

router.post("/jakobi", async (req, res) => {
  const result = await solveByJacobi(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });
  const complexity = await calculateComplexity(jakobi);

  res.status(200).send({ result, complexity });
});

router.post("/cramer", async (req, res) => {
  const result = await solveByCramer(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });
  const complexity = await calculateComplexity(cramer);

  res.status(200).send({ result, complexity });
});

router.post("/gauss", async (req, res) => {
  const result = await solveByGauss(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });
  const complexity = await calculateComplexity(gauss);

  res.status(200).send({ result, complexity });
});

export default router;
