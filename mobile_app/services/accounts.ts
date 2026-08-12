import { api } from "@/services/api";

export type UserRole = "customer" | "provider";

export type User = {
  id: string;
  email: string;

  first_name: string;
  last_name: string;
  full_name: string;

  avatar: string | null;

  role: UserRole;

  auth_provider?: string;
  created_at?: string;
};

/**
 * GET /accounts/profile/
 *
 * Get the currently authenticated user.
 */
export async function getMyUser(): Promise<User> {
  const response = await api.get<User>("/accounts/profile/");

  return response.data;
}

/**
 * PATCH /accounts/profile/
 *
 * Update the currently authenticated user's account information.
 *
 * Only send fields that are actually being changed.
 */
export type UpdateMyUserData = {
  first_name?: string;
  last_name?: string;
};

export async function updateMyUser(data: UpdateMyUserData): Promise<User> {
  const response = await api.patch<User>("/accounts/profile/", data);
  console.log("UPDATED USER FROM DJANGO:", response.data);

  return response.data;
}
