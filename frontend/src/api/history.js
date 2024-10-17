import axiosInstance from "./axios";

const HISTORY_CONTROLLER = "/history";

export function getHistory() {
  return axiosInstance.get(HISTORY_CONTROLLER + "/", {
    withCredentials: true,
  });
}
