import React, { useState } from "react";

import { Alert, Text, View, Pressable, ActivityIndicator } from "react-native";

import * as WebBrowser from "expo-web-browser";

import { colors } from "@/styles/global";

const GOOGLE_LOGIN_URL =
  "https://sirav1-1.onrender.com/api/v1/auth/google/start/";

const REDIRECT_URI = "mobileapp://auth/callback";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setSubmitting(true);

      console.log("START GOOGLE LOGIN");

      console.log("REDIRECT URI:", REDIRECT_URI);

      const result = await WebBrowser.openAuthSessionAsync(
        GOOGLE_LOGIN_URL,
        REDIRECT_URI,
      );

      console.log("GOOGLE AUTH RESULT:", result);

      if (result.type === "success") {
        console.log("AUTH CALLBACK:", result.url);

        /*
         * Important:
         *
         * The callback route has already
         * handled the tokens.
         *
         * Expo Router should now display:
         *
         * /(tabs)/add
         */
      }

      if (result.type === "cancel") {
        console.log("GOOGLE LOGIN CANCELLED");
      }

      if (result.type === "dismiss") {
        console.log("GOOGLE LOGIN DISMISSED");
      }
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      Alert.alert(
        "Google Sign-In Failed",
        "Unable to complete Google authentication.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 30,
        }}
      >
        Sign in to Sira
      </Text>

      <Pressable
        onPress={handleGoogleSignIn}
        disabled={submitting}
        style={{
          backgroundColor: "#ffffff",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <Text
            style={{
              color: "#000000",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Continue with Google
          </Text>
        )}
      </Pressable>
    </View>
  );
}
