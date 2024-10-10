import {
  createContext,
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import { refreshToken } from "../api/auth";
import axiosInstance from "../api/axios";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    console.log("in use effect");
    const fetchRefresh = async () => {
      try {
        const response = await refreshToken();
        setToken(response.data);
      } catch {
        setToken(null);
      }
    };

    fetchRefresh();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use((config) => {
      console.log("in auth interceptor1");
      console.log(token);
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("in auth interceptor2");
        const prevRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.data.message === "JWT must be provided"
        ) {
          try {
            const response = await refreshToken();
            setToken(response.data);
            prevRequest.headers.Authorization = `Bearer ${response.data}`;
            prevRequest._retry = true;
            return axiosInstance(prevRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
