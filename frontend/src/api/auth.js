import axiosInstance from "./axios";

const AUTH_CONTROLLER = "/auth";

export function loginUser(email, password) {
  const loginDto = {
    email: email,
    password: password,
  };

  return axiosInstance.post(AUTH_CONTROLLER + "/login", loginDto, {
    withCredentials: true,
  });
}

export function registerUser(username, email, password) {
  const registerDto = {
    username: username,
    email: email,
    password: password,
  };

  return axiosInstance.post(AUTH_CONTROLLER + "/register", registerDto, {
    withCredentials: true,
  });
}

export function refreshToken() {
  return axiosInstance.get(AUTH_CONTROLLER + "/refresh", {
    withCredentials: true,
  });
}

export function logout() {
  return axiosInstance.delete(AUTH_CONTROLLER + "/logout", {
    withCredentials: true,
  });
}
