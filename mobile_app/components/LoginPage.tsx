import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";

import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { googleLogin } from "@/services/auth";
import { colors } from "@/styles/global";

export default function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      profileImageSize: 150,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setSubmitting(true);

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        return;
      }

      const { idToken, user } = response.data;

      console.log("GOOGLE USER:", user);

      if (!idToken) {
        Alert.alert("Login Error", "Google did not return an ID token.");
        return;
      }

      // Send Google token to Django
      const data = await googleLogin(idToken);

      console.log("DJANGO LOGIN:", data);
    } catch (error) {
      console.error("GOOGLE LOGIN ERROR:", error);

      Alert.alert("Google Sign-In Failed", "Unable to sign in with Google.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        height: 100,
        width: "100%",
        paddingVertical: 30,
        backgroundColor: colors.surface,
        alignItems: "center",
      }}
    >
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
        disabled={submitting}
      />
    </View>
  );
}
