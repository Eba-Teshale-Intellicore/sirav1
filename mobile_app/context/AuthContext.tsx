import React, { createContext, useContext, useEffect, useState } from "react";

import { getAccessToken, clearTokens } from "@/services/authStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  async function refreshAuth() {
    try {
      const accessToken = await getAccessToken();

      console.log("AUTH TOKEN EXISTS:", Boolean(accessToken));

      setIsAuthenticated(Boolean(accessToken));
    } catch (error) {
      console.error("AUTH CHECK ERROR:", error);

      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    async function initializeAuth() {
      try {
        await refreshAuth();
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, []);

  async function login() {
    console.log("AUTH LOGIN");

    await refreshAuth();
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
        refreshAuth,
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
