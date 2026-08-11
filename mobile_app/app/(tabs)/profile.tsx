import React from "react";
import { ActivityIndicator, View } from "react-native";
import ProfilePage from "@/components/ProfilePage";
import { useAuth } from "@/context/AuthContext";
import LoginPage from "@/components/LoginPage";

export default function profile() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return (
    <View>
      <ProfilePage />
    </View>
  );
}

// export default function Profile() {
//   const {
//     isAuthenticated,
//     isLoading,
//   } = useAuth();

//   if (isLoading) {
//     return <ActivityIndicator />;
//   }

//   if (!isAuthenticated) {
//     return <LoginPage />;
//   }

//   return <ProfilePage />;
// }
