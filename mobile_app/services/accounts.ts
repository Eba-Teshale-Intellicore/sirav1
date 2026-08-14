import { api } from "@/services/api";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  role: "customer" | "provider";
  auth_provider?: string;
  created_at?: string;
};

export type UpdateUserData = {
  first_name?: string;
  last_name?: string;
};

// =========================================================
// GET CURRENT USER
// =========================================================

export async function getMyUser(): Promise<User> {
  const response = await api.get("/accounts/profile/");

  return response.data;
}

// =========================================================
// UPDATE CURRENT USER
// =========================================================

export async function updateMyUser(data: UpdateUserData): Promise<User> {
  console.log("UPDATING USER:", data);

  const response = await api.patch("/accounts/profile/", data);

  console.log("UPDATED USER FROM DJANGO:", response.data);

  return response.data;
}
