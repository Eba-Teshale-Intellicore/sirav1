import { api } from "@/services/api";

export const getCategories = async () => {
  const res = await api.get("/api/v1/categories");
  return res.data;
};
