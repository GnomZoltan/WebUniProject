import { parentPort, workerData } from "worker_threads";
import {
  solveByCramer,
  solveByGauss,
  solveByJacobi,
} from "../services/slae-algorithms.mjs";
import { calculateComplexity } from "../services/complexity-openai.mjs";
import { jakobi, cramer, gauss } from "../services/openaiFunctions.mjs";

const { coefficients, results, method } = workerData;

(async () => {
  try {
    parentPort.postMessage({ status: "solving_equations" });

    let result;

    if (method === "jacobi")
      result = await solveByJacobi(coefficients, results);
    else if (method === "cramer")
      result = await solveByCramer(coefficients, results);
    else if (method === "gauss")
      result = await solveByGauss(coefficients, results);

    parentPort.postMessage({ status: "calculating_complexity", result });

    let complexity;

    if (method === "jacobi") complexity = await calculateComplexity(jakobi);
    else if (method === "cramer")
      complexity = await calculateComplexity(cramer);
    else if (method === "gauss") complexity = await calculateComplexity(gauss);

    parentPort.postMessage({ status: "success", result, complexity });
  } catch (error) {
    console.error(error);
    parentPort.postMessage({ status: "error", error: error.message });
  }
})();
