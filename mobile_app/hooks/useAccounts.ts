import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyUser, updateMyUser, UpdateUserData } from "@/services/accounts";

// =========================================================
// GET MY USER
// =========================================================

export function useMyUserProfile() {
  return useQuery({
    queryKey: ["my-user-profile"],
    queryFn: getMyUser,
  });
}

// =========================================================
// UPDATE MY USER
// =========================================================

export function useUpdateMyUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) => updateMyUser(data),

    onSuccess: (updatedUser) => {
      console.log("REACT QUERY UPDATED USER:", updatedUser);

      // Immediately update cached user
      queryClient.setQueryData(["my-user-profile"], updatedUser);

      // Also make sure server data is fresh
      queryClient.invalidateQueries({
        queryKey: ["my-user-profile"],
      });
    },

    onError: (error) => {
      console.error("USER PROFILE UPDATE ERROR:", error);
    },
  });
}
