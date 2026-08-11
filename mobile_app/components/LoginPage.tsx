import React, { useState } from "react";
import { Alert, Text, View, Pressable, ActivityIndicator } from "react-native";

import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";

import { colors } from "@/styles/global";
import { useAuth } from "@/context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_LOGIN_URL =
  "https://sirav1-1.onrender.com/api/v1/auth/google/start/";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  const { refreshAuth } = useAuth();

  // IMPORTANT:
  // In Expo Go this becomes something like:
  //
  // exp://192.168.0.127:8081/--/auth/callback
  //
  const redirectUri = makeRedirectUri({
    path: "auth/callback",
  });

  console.log("SIRA REDIRECT URI:", redirectUri);

  const handleGoogleSignIn = async () => {
    try {
      setSubmitting(true);

      console.log("START GOOGLE LOGIN");
      console.log("REDIRECT URI:", redirectUri);

      /*
       * Send the Expo Go redirect URI to Django.
       */
      const loginUrl =
        `${GOOGLE_LOGIN_URL}?redirect_uri=` + encodeURIComponent(redirectUri);

      console.log("GOOGLE LOGIN URL:", loginUrl);

      const result = await WebBrowser.openAuthSessionAsync(
        loginUrl,
        redirectUri,
      );

      console.log("GOOGLE AUTH RESULT:", result);

      if (result.type === "success") {
        console.log("AUTH CALLBACK URL:", result.url);

        /*
         * The callback route may already have saved
         * the tokens.
         *
         * Refresh AuthContext.
         */
        await refreshAuth();

        console.log("AUTH REFRESHED");
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
