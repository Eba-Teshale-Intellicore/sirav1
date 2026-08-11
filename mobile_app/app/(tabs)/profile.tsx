import React from "react";
import { View } from "react-native";
import ProfilePage from "@/components/ProfilePage";

export default function profile() {
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
