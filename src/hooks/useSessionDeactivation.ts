import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiClient } from "../services/apiClient";

interface Session {
  id: string;
  deviceInfo: string;
  ipAddress: string;
  isActive: boolean;
}

export const useSessionDeactivation = (accessToken: string, fetchUserInfo: () => Promise<void>) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const initializeSessions = (initialSessions: Session[]) => {
    setSessions(initialSessions);
  };

  const deactivateSession = async (sessionId: string) => {
    try {
      await apiClient.post(
        "/token/deactivate-session",
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Session deactivated successfully.");

      await fetchUserInfo(); 
    } catch (error: any) {
      console.error("Failed to deactivate session:", error.response?.data || error.message);
      toast.error("Failed to deactivate session. Please try again.");
    }
  };

  return {
    sessions,
    initializeSessions,
    deactivateSession,
  };
};
