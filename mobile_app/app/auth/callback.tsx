import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { saveTokens } from "@/services/authStorage";
import { useAuth } from "@/context/AuthContext";
import { colors } from "@/styles/global";

export default function AuthCallback() {
  const params = useLocalSearchParams<{
    access_token?: string;
    refresh_token?: string;
  }>();

  const { login } = useAuth();

  useEffect(() => {
    async function completeLogin() {
      try {
        console.log("AUTH CALLBACK PARAMS:", params);

        const accessToken = params.access_token;
        const refreshToken = params.refresh_token;

        if (!accessToken || !refreshToken) {
          console.error("Missing authentication tokens.");

          router.replace("/(tabs)/index");
          return;
        }

        // 1. Save tokens
        await saveTokens(accessToken, refreshToken);

        console.log("TOKENS SAVED");

        // 2. Tell AuthContext
        await login();

        console.log("AUTH CONTEXT UPDATED");

        // 3. Go to Add page
        router.replace("/(tabs)/add");
      } catch (error) {
        console.error("AUTH CALLBACK ERROR:", error);

        router.replace("/(tabs)/index");
      }
    }

    completeLogin();
  }, []);

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

      <Text
        style={{
          color: colors.text,
          marginTop: 20,
          fontSize: 16,
        }}
      >
        Completing Sira login...
      </Text>
    </View>
  );
}
