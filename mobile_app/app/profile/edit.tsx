import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { colors } from "@/styles/global";
import { useAuth } from "@/context/AuthContext";
import { useMyUserProfile, useUpdateMyUserProfile } from "@/hooks/useAccounts";

export default function EditProfilePage() {
  const router = useRouter();

  // const { user } = useAuth();
  const { refreshAuth } = useAuth();

  const { data: profile, isLoading } = useMyUserProfile();

  const updateProfile = useUpdateMyUserProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
  }, [profile]);

  const handleSave = () => {
    console.log("SAVING USER PROFILE:", {
      first_name: firstName,
      last_name: lastName,
    });

    updateProfile.mutate(
      {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      },
      {
        onSuccess: async (updatedUser) => {
          console.log("USER PROFILE UPDATED:", updatedUser);

          await refreshAuth();

          router.back();
        },

        onError: (error: any) => {
          console.log(
            "USER PROFILE UPDATE ERROR:",
            error?.response?.data || error,
          );
        },
      },
    );
  };

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

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 50,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 28,
          fontWeight: "700",
          marginBottom: 25,
        }}
      >
        Edit Profile
      </Text>

      <Field label="First Name" value={firstName} onChangeText={setFirstName} />

      <Field label="Last Name" value={lastName} onChangeText={setLastName} />

      <TouchableOpacity
        onPress={handleSave}
        disabled={updateProfile.isPending}
        style={{
          marginTop: 20,
          padding: 17,
          borderRadius: 15,
          backgroundColor: colors.primary,
          alignItems: "center",
          opacity: updateProfile.isPending ? 0.6 : 1,
        }}
      >
        <Text
          style={{
            color: colors.background,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {updateProfile.isPending ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        style={{
          color: colors.textSecondary,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textSecondary}
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          borderRadius: 14,
          padding: 15,
          minHeight: 52,
        }}
      />
    </View>
  );
}
