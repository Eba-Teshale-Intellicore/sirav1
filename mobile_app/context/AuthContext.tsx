import React, { createContext, useContext, useEffect, useState } from "react";

import { getAccessToken, clearTokens } from "@/services/authStorage";

import { getMyUser, User } from "@/services/accounts";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // =========================================================
  // CHECK AUTH + LOAD USER
  // =========================================================

  async function refreshAuth() {
    try {
      const accessToken = await getAccessToken();

      console.log("AUTH TOKEN EXISTS:", Boolean(accessToken));

      if (!accessToken) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const currentUser = await getMyUser();

      console.log("CURRENT USER:", currentUser);

      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("AUTH CHECK ERROR:", error);

      setUser(null);
      setIsAuthenticated(false);
    }
  }

  // =========================================================
  // INITIAL AUTH CHECK
  // =========================================================

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

  // =========================================================
  // LOGIN
  // =========================================================

  async function login() {
    await refreshAuth();
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  async function logout() {
    try {
      await clearTokens();

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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

// =========================================================
// HOOK
// =========================================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
