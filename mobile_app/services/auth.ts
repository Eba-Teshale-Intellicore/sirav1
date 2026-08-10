import { api } from "@/services/api";

export interface GoogleLoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    avatar: string | null;
    role: string;
  };
}

export const googleLogin = async (
  idToken: string,
): Promise<GoogleLoginResponse> => {
  const response = await api.post<GoogleLoginResponse>("/api/v1/auth/google/", {
    id_token: idToken,
  });

  return response.data;
};
