// services/accounts.ts

import { api } from "@/services/api";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  role: "customer" | "provider";
};

export async function getMyUser(): Promise<User> {
  const response = await api.get("/accounts/profile/");
  return response.data;
}
