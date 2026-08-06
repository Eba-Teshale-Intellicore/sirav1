import { api } from "@/services/api";

export const getServices = async () => {
  const res = await api.get("/api/v1/services/");
  return res.data;
};

export const postService = async (formData: FormData) => {
  const res = await api.post("/api/v1/services/", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });

  return res.data;
};
