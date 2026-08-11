import React from "react";
import { ActivityIndicator, View } from "react-native";

import AddPage from "@/components/AddPage";
import LoginPage from "@/components/LoginPage";

import { useAuth } from "@/context/AuthContext";

import { colors } from "@/styles/global";

export default function Add() {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("ADD TAB:", {
    isAuthenticated,
    isLoading,
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
    console.log("ADD TAB → LOGIN PAGE");

    return <LoginPage />;
  }

  console.log("ADD TAB → ADD PAGE");

  return <AddPage />;
}
