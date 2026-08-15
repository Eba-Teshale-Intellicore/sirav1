import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyProviderProfile,
  updateMyProviderProfile,
} from "@/services/providerprofile";

export function useMyProviderProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["my-provider-profile"],
    queryFn: getMyProviderProfile,
    enabled: options?.enabled ?? true,
  });
}

export const useUpdateMyProviderProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProviderProfile,

    onSuccess: (updatedProvider) => {
      console.log("REACT QUERY UPDATED PROVIDER:", updatedProvider);

      // Immediately update the cache
      queryClient.setQueryData(["my-provider-profile"], updatedProvider);

      // Then make sure server data is fresh
      queryClient.invalidateQueries({
        queryKey: ["my-provider-profile"],
      });
    },

    onError: (error: any) => {
      console.error(
        "PROVIDER PROFILE UPDATE ERROR:",
        error?.response?.data || error,
      );
    },
  });
};
