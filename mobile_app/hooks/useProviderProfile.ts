import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyProviderProfile,
  updateMyProviderProfile,
} from "@/services/providerprofile";

export const useMyProviderProfile = () => {
  return useQuery({
    queryKey: ["my-provider-profile"],
    queryFn: getMyProviderProfile,
  });
};

export const useUpdateProviderProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProviderProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-provider-profile"],
      });
    },
  });
};
