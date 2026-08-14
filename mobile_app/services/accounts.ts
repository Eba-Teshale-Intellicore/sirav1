import { api } from "@/services/api";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  role: "customer" | "provider";
  auth_provider?: "google" | "email";
};

export async function getMyUser(): Promise<User> {
  const response = await api.get("/accounts/profile/");
  return response.data;
}

export async function updateMyUserProfile(data: {
  first_name?: string;
  last_name?: string;
}): Promise<User> {
  const response = await api.patch("/accounts/profile/", data);

  return response.data;
}
