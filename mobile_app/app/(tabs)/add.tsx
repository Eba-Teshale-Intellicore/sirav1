import React from "react";

import { ActivityIndicator, View } from "react-native";

import AddPage from "@/components/AddPage";
import LoginPage from "@/components/LoginPage";

import { useAuth } from "@/context/AuthContext";

import { colors } from "@/styles/global";

export default function Add() {
  const { isAuthenticated, isLoading } = useAuth();

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

  return <AddPage />;
}
