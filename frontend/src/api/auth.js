import axiosInstance from "./axios";

const AUTH_CONTROLLER = "/auth";

export function getAll() {
  return axiosInstance.get("/user/", {
    withCredentials: true,
  });
}

export function loginUser(email, password) {
  const loginDto = {
    email: email,
    password: password,
  };

  return axiosInstance.post(AUTH_CONTROLLER + "/login", loginDto, {
    withCredentials: true,
  });
}

export function registerUser(email, password, username) {
  const registerDto = {
    username: username,
    email: email,
    password: password,
  };

  return axiosInstance.post(AUTH_CONTROLLER + "/register", registerDto);
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
