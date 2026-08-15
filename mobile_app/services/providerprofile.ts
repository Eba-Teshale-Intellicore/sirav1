import { api } from "@/services/api";

export type ProviderProfileUpdateData = {
  bio?: string;
  phone?: string;
  city?: string;
  address?: string;
  experience_years?: number;
  languages?: string;
};

// =========================================================
// GET MY PROVIDER PROFILE
// =========================================================

export const getMyProviderProfile = async () => {
  const response = await api.get("/providers/my-profile/");

  console.log("PROVIDER PROFILE RESPONSE:", response.data);

  return response.data;
};

// =========================================================
// UPDATE MY PROVIDER PROFILE
// =========================================================

export const updateMyProviderProfile = async (
  data: ProviderProfileUpdateData,
) => {
  console.log("UPDATING PROVIDER PROFILE:", data);

  const response = await api.patch("/providers/my-profile/", data);

  console.log("UPDATED PROVIDER PROFILE FROM DJANGO:", response.data);

  return response.data;
};
