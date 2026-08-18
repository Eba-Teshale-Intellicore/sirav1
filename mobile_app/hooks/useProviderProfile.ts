import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyProviderProfile,
  updateMyProviderProfile,
  ProviderProfileUpdateData,
} from "@/services/providerprofile";

export function useMyProviderProfile(options?: { enabled?: boolean }) {
  const enabled = options?.enabled ?? true;

  return useQuery({
    queryKey: ["my-provider-profile"],
    queryFn: getMyProviderProfile,

    enabled,

    retry: false,

    staleTime: 5 * 60 * 1000,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useUpdateMyProviderProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProviderProfileUpdateData) =>
      updateMyProviderProfile(data),

    onSuccess: (updatedProvider) => {
      console.log("REACT QUERY UPDATED PROVIDER:", updatedProvider);

      queryClient.setQueryData(["my-provider-profile"], updatedProvider);
    },

    onError: (error: any) => {
      console.error(
        "PROVIDER PROFILE UPDATE ERROR:",
        error?.response?.data || error,
      );
    },
  });
}
