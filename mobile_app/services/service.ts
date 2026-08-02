import { api } from "@/services/api";

export const getServices = async () => {
  const res = await api.get("/api/v1/services/");
  return res.data;
};
