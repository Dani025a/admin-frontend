import { useState, useEffect } from "react";
import { apiClient } from "../services/apiClient";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  status: string;
  role: string;
}

export const useUsers = (token: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  return { users, loading, error, setUsers };
};
