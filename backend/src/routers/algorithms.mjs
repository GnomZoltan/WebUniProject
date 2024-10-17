import { Router } from "express";
import {
  solveByJacobi,
  solveByCramer,
  solveByGauss,
} from "../services/slae-algorithms.mjs";
import { calculateComplexity } from "../services/complexity-openai.mjs";
import { jakobi, cramer, gauss } from "../services/openaiFunctions.mjs";

const router = Router();

router.get("/progress", (req, res) => {
  // Встановлення заголовків для SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendProgress = (progress) => {
    res.write(`data: ${JSON.stringify({ progress })}\n\n`);
  };

  req.on("close", () => {
    console.log("Client disconnected");
    res.end();
  });

  // Цей ендпоінт буде чекати підписку на подію обчислення
});

router.post("/jakobi", async (req, res) => {
  console.log("controller");

  const result = await solveByJacobi(req.body.coefficients, req.body.results);

  if (!result) return res.status(404).send({ message: "Invalid input" });
  const complexity = await calculateComplexity(jakobi);

  console.log({ result, complexity });

  res.status(200).send({ result, complexity });
});

router.post("/cramer", async (req, res) => {
  const result = await solveByCramer(
    req.body.coefficients,
    req.body.results
    // (progress) => {
    //   console.log(`Cramer Progress: ${progress}%`);
    // }
  );

  if (!result) return res.status(404).send({ message: "Invalid input" });
  const complexity = await calculateComplexity(cramer);

  res.status(200).send({ result, complexity });
});

router.post("/gauss", async (req, res) => {
  const result = await solveByGauss(
    req.body.coefficients,
    req.body.results
    // (progress) => {
    //   console.log(`Cramer Progress: ${progress}%`);
    // }
  );

  if (!result) return res.status(404).send({ message: "Invalid input" });
  const complexity = await calculateComplexity(gauss);

  res.status(200).send({ result, complexity });
});

export default router;
