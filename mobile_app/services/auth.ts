// services/auth.ts

import { api } from "@/services/api";

export const googleLogin = async (idToken: string) => {
  const response = await api.post("/api/v1/auth/google/", {
    id_token: idToken,
  });

  return response.data;
};
