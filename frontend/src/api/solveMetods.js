import axiosInstance from "./axios";
import { toast } from "react-toastify";

const SOLVE_CONTROLLER = "/solve";

function handleError(error) {
  toast.error(`Request was canceled or runs too long`);
  throw error;
}

export function getTaskStatus(taskId) {
  return axiosInstance.get(SOLVE_CONTROLLER + `/status/${taskId}`, {
    params: { taskId },
    withCredentials: true,
  });
}

export function solveJakobi(coefficients, results) {
  const Dto = { coefficients, results };
  return axiosInstance
    .post(SOLVE_CONTROLLER + "/jakobi", Dto, {
      withCredentials: true,
    })
    .catch(handleError);
}

export function solveCramer(coefficients, results) {
  const Dto = { coefficients, results };
  return axiosInstance
    .post(SOLVE_CONTROLLER + "/cramer", Dto, {
      withCredentials: true,
    })
    .catch(handleError);
}

export function solveGauss(coefficients, results) {
  const Dto = { coefficients, results };
  return axiosInstance
    .post(SOLVE_CONTROLLER + "/gauss", Dto, {
      withCredentials: true,
    })
    .catch(handleError);
}
