import React from "react";
import { ActivityIndicator, View } from "react-native";
import ProfilePage from "@/components/ProfilePage";
import { useAuth } from "@/context/AuthContext";
import LoginPage from "@/components/LoginPage";
import { colors } from "@/styles/global";

export default function Profile() {
  const { isAuthenticated, isLoading, user } = useAuth();
  console.log("PROFILE SCREEN:", {
    isAuthenticated,
    isLoading,
    user,
  });

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <ProfilePage />;
}
