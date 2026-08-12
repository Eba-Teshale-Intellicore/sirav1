import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyUser, updateMyUser, UpdateMyUserData } from "@/services/accounts";

const MY_USER_QUERY_KEY = ["my-user-profile"];

/**
 * Get currently authenticated user.
 */
export function useMyUserProfile() {
  return useQuery({
    queryKey: MY_USER_QUERY_KEY,
    queryFn: getMyUser,
  });
}

/**
 * Update currently authenticated user.
 */
export function useUpdateMyUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMyUserData) => updateMyUser(data),

    onSuccess: (updatedUser) => {
      // Immediately update cached user.
      console.log("REACT QUERY UPDATED USER:", updatedUser);
      queryClient.setQueryData(MY_USER_QUERY_KEY, updatedUser);

      // Make sure the server is the source of truth.
      queryClient.invalidateQueries({
        queryKey: MY_USER_QUERY_KEY,
      });
    },
  });
}
