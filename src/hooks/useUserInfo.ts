import { useState, useCallback, useEffect } from "react";
import { apiClient } from "../services/apiClient";

interface UserSession {
  id: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
  deviceInfo: string;
  ipAddress: string;
  isActive: boolean;
}

interface UserInfo {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  status: string;
  role: string;
  sessions: UserSession[];
}

interface UseUserInfoResult {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
  fetchUserInfo: () => Promise<void>;
}

const useUserInfo = (token: string | null): UseUserInfoResult => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = useCallback(async () => {
    if (!token) {
      setError("Missing authentication token");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get<UserInfo>("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching user info:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to fetch user info");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { user, loading, error, fetchUserInfo };
};

export default useUserInfo;
