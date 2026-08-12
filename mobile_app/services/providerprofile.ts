import { api } from "@/services/api";

export const getMyProviderProfile = async () => {
  const response = await api.get("/providers/my-profile/");
  return response.data;
};

export const updateMyProviderProfile = async (formData: FormData) => {
  const response = await api.patch("/providers/my-profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
