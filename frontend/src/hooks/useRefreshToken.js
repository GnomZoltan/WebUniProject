import { refreshToken } from "../api/auth";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await refreshToken();

    setAuth((prev) => {
      console.log("In refresh hook");
      console.log(prev);
      console.log(response.data);
      return { ...prev, accessToken: response.data };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
