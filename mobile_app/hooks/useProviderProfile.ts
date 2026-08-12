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
