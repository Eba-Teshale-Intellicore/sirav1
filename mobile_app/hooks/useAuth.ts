import { useEffect, useState } from "react";
import { getAccessToken } from "@/services/authStorage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getAccessToken();

      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("AUTH CHECK ERROR:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
  };
}
