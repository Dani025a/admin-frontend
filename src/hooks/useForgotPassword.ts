import { useState } from "react";
import axios from "axios";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function requestPasswordReset(email: string): Promise<void> {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:2001/api/auth/request-password-reset", { email });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error("Password reset request failed:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "An unexpected error occurred");
    }
  }

  return { requestPasswordReset, isLoading };
}
