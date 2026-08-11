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

  const { refreshAuth } = useAuth();

  useEffect(() => {
    async function completeLogin() {
      try {
        console.log("AUTH CALLBACK PARAMS:", params);

        const accessToken = params.access_token;
        const refreshToken = params.refresh_token;

        if (!accessToken || !refreshToken) {
          console.error("Missing authentication tokens.");

          router.replace("/(tabs)/add");

          return;
        }

        console.log("ACCESS TOKEN EXISTS:", Boolean(accessToken));
        console.log("REFRESH TOKEN EXISTS:", Boolean(refreshToken));

        /*
         * Save JWT tokens.
         */
        await saveTokens(accessToken, refreshToken);

        console.log("TOKENS SAVED");

        /*
         * Tell AuthContext to check SecureStore again.
         */
        await refreshAuth();

        console.log("AUTH CONTEXT REFRESHED");

        /*
         * Now go directly to Add.
         */
        router.replace("/(tabs)/add");
      } catch (error) {
        console.error("AUTH CALLBACK ERROR:", error);

        router.replace("/(tabs)/add");
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
          marginTop: 20,
          color: colors.text,
          fontSize: 16,
        }}
      >
        Completing Sira login...
      </Text>
    </View>
  );
}
