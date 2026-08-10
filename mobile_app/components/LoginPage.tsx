import React, { useEffect, useState } from "react";
import { View, Alert, Text, Pressable } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

import { googleLogin } from "@/services/auth";
import { colors } from "@/styles/global";

WebBrowser.maybeCompleteAuthSession();

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  const redirectUri = makeRedirectUri({
    scheme: "mobileapp",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,

    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,

    redirectUri,

    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleResponse(response.authentication?.idToken);
    }
  }, [response]);

  const handleGoogleResponse = async (idToken?: string) => {
    if (!idToken) {
      Alert.alert("Login Error", "Google did not return an ID token.");
      return;
    }

    try {
      setSubmitting(true);

      console.log("GOOGLE ID TOKEN:", idToken);

      const data = await googleLogin(idToken);

      console.log("DJANGO LOGIN:", data);

      Alert.alert("Success", "Welcome to Sira!");
    } catch (error) {
      console.error("DJANGO GOOGLE LOGIN ERROR:", error);

      Alert.alert("Login Failed", "Unable to authenticate with Sira.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setSubmitting(true);

      await promptAsync();
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      Alert.alert("Google Sign-In Failed", "Unable to sign in with Google.");

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
        disabled={!request || submitting}
        style={{
          backgroundColor: "#ffffff",
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
          opacity: !request || submitting ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {submitting ? "Signing in..." : "Continue with Google"}
        </Text>
      </Pressable>
    </View>
  );
}
