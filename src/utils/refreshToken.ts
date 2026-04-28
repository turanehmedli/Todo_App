
import api from "./axios";
const refreshToken = async () => {
  try {
    const response = await api.post(
      "/auth/refreshToken",
      {},
      { withCredentials: true },
    );
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
};
export default refreshToken;
