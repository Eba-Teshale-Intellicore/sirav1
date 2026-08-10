import React, { createContext, useContext, useEffect, useState } from "react";

import { getAccessToken, clearTokens } from "@/services/authStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      const token = await getAccessToken();

      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("AUTH CHECK ERROR:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  function login() {
    setIsAuthenticated(true);
  }

  async function logout() {
    await clearTokens();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
