import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./loadingScreen";

interface AuthGuardProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const { ensureValidAccessToken, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      try {
        setIsLoading(true);
        await ensureValidAccessToken();
      } catch {
        if (isMounted) navigate("/unauthorized");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [ensureValidAccessToken, navigate]);

  if (isLoading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return <>{isAuthenticated ? children : navigate("/unauthorized")}</>;
}

export default AuthGuard;
