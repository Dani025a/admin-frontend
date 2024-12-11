import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:2001/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (
      response?.status === 403 &&
      [
        "Expired sessions have been deactivated",
        "Invalid or expired refresh token",
        "Session is inactive. Access denied.",
      ].includes(response.data.message)
    ) {
      console.warn("Session issue detected. Dispatching logout event.");
      const event = new Event("logout");
      window.dispatchEvent(event);
    }

    return Promise.reject(error); 
  }
);
