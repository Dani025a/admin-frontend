import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../services/apiClient";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [roles, setRoles] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const decodeToken = (token: string): { [key: string]: any } => {
    return JSON.parse(atob(token.split(".")[1]));
  };

  const isTokenExpired = (token: string): boolean => {
    const payload = decodeToken(token);
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  };

  const extractDataFromToken = (token: string) => {
    const payload = decodeToken(token);
    setRoles(payload.roles || []);
    setFirstname(payload.firstname || null);
    setLastname(payload.lastname || null);
    setUserId(payload.userId || null);
  };

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      extractDataFromToken(accessToken);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      throw new Error(errorMessage);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      console.log("Refresh token at logout:", refreshToken);

      if (refreshToken) {
        await apiClient.post(
          "/auth/logout",
          { refreshToken },
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setAccessToken(null);
      setRefreshToken(null);
      setRoles([]);
      setFirstname(null);
      setLastname(null);
      setUserId(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error("Logout failed:", error.response?.data || error.message);

      const errorMessage =
        error.response?.data?.message || "An error occurred during logout";

      throw new Error(errorMessage);
    }
  }, [refreshToken]);

  const ensureValidAccessToken = useCallback(async (): Promise<void> => {
    if (!refreshToken) {
      console.log("No refresh token, logging out.");
      await logout();
      return;
    }

    console.log("Decoded refresh token:", decodeToken(refreshToken));

    if (isTokenExpired(refreshToken)) {
      console.log("Refresh token is expired, logging out.");
      await logout();
      return;
    }

    if (!accessToken || isTokenExpired(accessToken)) {
      try {
        const response = await apiClient.post(
          "/token/refresh-token",
          { refreshToken },
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        setAccessToken(newAccessToken);
        extractDataFromToken(newAccessToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        await logout();
      }
    } else if (!roles.length && accessToken) {
      extractDataFromToken(accessToken);
    }
  }, [accessToken, refreshToken, logout, roles.length]);

  useEffect(() => {
    const handleLogout = async () => {
      console.warn("Global logout event received. Logging out...");
      await logout();
    };

    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, [logout]);

  useEffect(() => {
    if (refreshToken && !isTokenExpired(refreshToken)) {
      ensureValidAccessToken();
    } else {
      logout();
    }
  }, [refreshToken, ensureValidAccessToken, logout]);

  return {
    login,
    logout,
    ensureValidAccessToken,
    accessToken,
    refreshToken,
    roles,
    firstname,
    lastname,
    userId,
    isAuthenticated,
  };
}
