// // services/providers.ts

import { api } from "./api";

// export const createProviderProfile = async (formData: FormData) => {
//   const response = await api.post("/providers/me/", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };
export const createProviderProfile = async (formData: FormData) => {
  const response = await api.post("/providers/me/", formData);

  return response.data;
};
