import axiosInstance from "./axios";
import { toast } from "react-toastify";

const SOLVE_CONTROLLER = "/solve";

function handleError(error) {
  toast.error(`Request was canceled or runs too long`);
  throw error;
}

export function solveJakobi(coefficients, results, signal) {
  const Dto = { coefficients, results };
  return axiosInstance
    .post(SOLVE_CONTROLLER + "/jakobi", Dto, {
      withCredentials: true,
      signal,
    })
    .catch(handleError);
}

export function solveCramer(coefficients, results, signal) {
  const Dto = { coefficients, results };
  return axiosInstance
    .post(SOLVE_CONTROLLER + "/cramer", Dto, {
      withCredentials: true,
      signal,
    })
    .catch(handleError);
}

export function solveGauss(coefficients, results, signal) {
  const Dto = { coefficients, results };
  return axiosInstance
    .post(SOLVE_CONTROLLER + "/gauss", Dto, {
      withCredentials: true,
      signal,
    })
    .catch(handleError);
}
