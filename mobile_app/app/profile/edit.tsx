import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors, typography } from "@/styles/global";
import { useAuth } from "@/context/AuthContext";
import { useMyUserProfile, useUpdateMyUserProfile } from "@/hooks/useAccounts";

export default function EditProfilePage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useMyUserProfile();

  const updateProfile = useUpdateMyUserProfile();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
  }, [profile]);

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    const first = firstName.trim();
    const last = lastName.trim();

    // Validation
    if (!first) {
      Alert.alert("Missing information", "Please enter your first name.");
      return;
    }

    if (!last) {
      Alert.alert("Missing information", "Please enter your last name.");
      return;
    }

    // Prevent unnecessary request
    if (
      first === (profile?.first_name ?? "") &&
      last === (profile?.last_name ?? "")
    ) {
      Alert.alert("No changes", "You haven't changed your profile.");
      return;
    }

    updateProfile.mutate(
      {
        first_name: first,
        last_name: last,
      },
      {
        onSuccess: async () => {
          try {
            await refreshAuth();

            Alert.alert(
              "Profile Updated",
              "Your profile has been updated successfully.",
              [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ],
            );
          } catch (refreshError) {
            console.log("AUTH REFRESH ERROR:", refreshError);

            router.back();
          }
        },

        onError: (error: any) => {
          console.log(
            "USER PROFILE UPDATE ERROR:",
            error?.response?.data || error,
          );

          Alert.alert(
            "Update failed",
            "We couldn't update your profile. Please try again.",
          );
        },
      },
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

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

  // =====================================================
  // ERROR
  // =====================================================

  if (isError && !profile) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Ionicons
          name="person-outline"
          size={50}
          color={colors.textSecondary}
        />

        <Text
          style={{
            ...typography.cardHeading,
            color: colors.text,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          Profile couldn't be loaded
        </Text>

        <Text
          style={{
            ...typography.body,
            color: colors.textSecondary,
            marginTop: 8,
            textAlign: "center",
          }}
        >
          {error instanceof Error
            ? error.message
            : "Something went wrong while loading your profile."}
        </Text>

        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            marginTop: 22,
            backgroundColor: colors.primary,
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              ...typography.button,
              color: colors.background,
            }}
          >
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={{
            height: 80,
            paddingHorizontal: 18,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: colors.surface,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back" size={23} color={colors.text} />
          </TouchableOpacity>

          <Text
            style={{
              ...typography.pageTitle,
              color: colors.text,
              marginLeft: 14,
            }}
          >
            Edit Profile
          </Text>
        </View>

        {/* =================================================
            CONTENT
        ================================================= */}

        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 25,
          }}
        >
          {/* INTRO */}

          <View
            style={{
              marginBottom: 28,
            }}
          >
            <Text
              style={{
                ...typography.cardHeading,
                color: colors.text,
              }}
            >
              Personal Information
            </Text>

            <Text
              style={{
                ...typography.body,
                color: colors.textSecondary,
                marginTop: 7,
                lineHeight: 22,
              }}
            >
              Update your name. This information will be shown on your Sira
              profile.
            </Text>
          </View>

          {/* FIRST NAME */}

          <Field
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            autoCapitalize="words"
          />

          {/* LAST NAME */}

          <Field
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            autoCapitalize="words"
          />

          {/* SAVE */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={updateProfile.isPending}
            style={{
              marginTop: 8,
              minHeight: 54,
              borderRadius: 15,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              opacity: updateProfile.isPending ? 0.6 : 1,
            }}
          >
            {updateProfile.isPending ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Text
                style={{
                  ...typography.button,
                  color: colors.background,
                }}
              >
                Save Changes
              </Text>
            )}
          </TouchableOpacity>

          {/* INFORMATION */}

          <View
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 15,
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={colors.primary}
              />

              <Text
                style={{
                  ...typography.subtitle,
                  color: colors.text,
                  marginLeft: 8,
                }}
              >
                Profile information
              </Text>
            </View>

            <Text
              style={{
                ...typography.caption,
                color: colors.textSecondary,
                marginTop: 8,
                lineHeight: 19,
              }}
            >
              Your name is used throughout Sira when displaying your account and
              booking information.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// =====================================================
// REUSABLE FIELD
// =====================================================

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  autoCapitalize = "sentences",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          ...typography.label,
          color: colors.text,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        style={{
          minHeight: 54,
          backgroundColor: colors.surface,
          color: colors.text,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: 15,
          fontSize: 15,
        }}
      />
    </View>
  );
}
