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

import { colors } from "@/styles/global";

import {
  useMyProviderProfile,
  useUpdateMyProviderProfile,
} from "@/hooks/useProviderProfile";

export default function ProviderEditProfilePage() {
  const router = useRouter();

  // =========================================================
  // PROVIDER PROFILE
  // =========================================================

  const {
    data: provider,
    isLoading,
    isError,
    error,
    refetch,
  } = useMyProviderProfile();

  const updateProvider = useUpdateMyProviderProfile();

  // =========================================================
  // FORM STATE
  // =========================================================

  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");

  // =========================================================
  // LOAD PROVIDER DATA
  // =========================================================

  useEffect(() => {
    if (!provider) return;

    setBio(provider.bio ?? "");
    setPhone(provider.phone ?? "");
    setCity(provider.city ?? "");
    setAddress(provider.address ?? "");

    setExperience(
      provider.experience_years !== null &&
        provider.experience_years !== undefined
        ? String(provider.experience_years)
        : "",
    );

    setLanguages(provider.languages ?? "");
  }, [provider]);

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = () => {
    const cleanBio = bio.trim();
    const cleanPhone = phone.trim();
    const cleanCity = city.trim();
    const cleanAddress = address.trim();
    const cleanLanguages = languages.trim();
    const cleanExperience = experience.trim();

    // -------------------------
    // VALIDATION
    // -------------------------

    if (!cleanBio) {
      Alert.alert(
        "Missing information",
        "Please tell customers about yourself.",
      );
      return;
    }

    if (!cleanPhone) {
      Alert.alert("Missing information", "Please enter your phone number.");
      return;
    }

    if (!cleanCity) {
      Alert.alert("Missing information", "Please enter your city.");
      return;
    }

    // -------------------------
    // EXPERIENCE VALIDATION
    // -------------------------

    let experienceYears = 0;

    if (cleanExperience) {
      experienceYears = Number(cleanExperience);

      if (
        Number.isNaN(experienceYears) ||
        experienceYears < 0 ||
        !Number.isFinite(experienceYears)
      ) {
        Alert.alert(
          "Invalid experience",
          "Please enter a valid number of years.",
        );
        return;
      }
    }

    // -------------------------
    // UPDATE
    // -------------------------

    console.log("UPDATING PROVIDER PROFILE:", {
      bio: cleanBio,
      phone: cleanPhone,
      city: cleanCity,
      address: cleanAddress,
      experience_years: experienceYears,
      languages: cleanLanguages,
    });

    updateProvider.mutate(
      {
        bio: cleanBio,
        phone: cleanPhone,
        city: cleanCity,
        address: cleanAddress,
        experience_years: experienceYears,
        languages: cleanLanguages,
      },
      {
        onSuccess: async (updatedProvider) => {
          console.log("PROVIDER PROFILE UPDATED:", updatedProvider);

          Alert.alert(
            "Profile Updated",
            "Your provider profile has been updated successfully.",
            [
              {
                text: "Done",
                onPress: () => {
                  router.back();
                },
              },
            ],
          );
        },

        onError: (error: any) => {
          console.log(
            "PROVIDER PROFILE UPDATE ERROR:",
            error?.response?.data || error,
          );

          const backendError = error?.response?.data;

          let message =
            "We couldn't update your provider profile. Please try again.";

          if (typeof backendError === "string") {
            message = backendError;
          } else if (backendError?.detail) {
            message = backendError.detail;
          } else if (backendError) {
            console.log("BACKEND VALIDATION ERRORS:", backendError);
          }

          Alert.alert("Update failed", message);
        },
      },
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

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

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 12,
            fontSize: 14,
          }}
        >
          Loading your provider profile...
        </Text>
      </View>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError && !provider) {
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
        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          Provider profile unavailable
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 21,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          We couldn't load your provider profile.
        </Text>

        {error instanceof Error && (
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {error.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => refetch()}
          style={{
            marginTop: 24,
            backgroundColor: colors.primary,
            paddingHorizontal: 28,
            paddingVertical: 14,
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              color: colors.background,
              fontSize: 15,
              fontWeight: "800",
            }}
          >
            Try Again
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 15,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

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
          padding: 20,
          paddingBottom: 60,
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            ← Back
          </Text>
        </TouchableOpacity>

        {/* =====================================================
            TITLE
        ===================================================== */}

        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "800",
            marginBottom: 8,
          }}
        >
          Edit Provider Profile
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 28,
          }}
        >
          Keep your provider information up to date so customers know who they
          are booking.
        </Text>

        {/* =====================================================
            ABOUT
        ===================================================== */}

        <Field
          label="About You"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell customers about your experience and skills..."
          multiline
        />

        {/* =====================================================
            PHONE
        ===================================================== */}

        <Field
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="+251 9XX XXX XXX"
          keyboardType="phone-pad"
        />

        {/* =====================================================
            CITY
        ===================================================== */}

        <Field
          label="City"
          value={city}
          onChangeText={setCity}
          placeholder="Addis Ababa"
        />

        {/* =====================================================
            ADDRESS
        ===================================================== */}

        <Field
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Your area or neighborhood"
        />

        {/* =====================================================
            EXPERIENCE
        ===================================================== */}

        <Field
          label="Experience"
          value={experience}
          onChangeText={setExperience}
          placeholder="Example: 3"
          keyboardType="numeric"
        />

        {/* =====================================================
            LANGUAGES
        ===================================================== */}

        <Field
          label="Languages"
          value={languages}
          onChangeText={setLanguages}
          placeholder="Amharic, Afaan Oromo, English"
        />

        {/* =====================================================
            SAVE BUTTON
        ===================================================== */}

        <TouchableOpacity
          onPress={handleSave}
          disabled={updateProvider.isPending}
          activeOpacity={0.8}
          style={{
            marginTop: 12,
            minHeight: 56,
            paddingHorizontal: 20,
            borderRadius: 15,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            opacity: updateProvider.isPending ? 0.6 : 1,
          }}
        >
          {updateProvider.isPending ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color={colors.background} />

              <Text
                style={{
                  color: colors.background,
                  fontSize: 16,
                  fontWeight: "800",
                  marginLeft: 10,
                }}
              >
                Saving...
              </Text>
            </View>
          ) : (
            <Text
              style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Save Changes
            </Text>
          )}
        </TouchableOpacity>

        {/* =====================================================
            INFORMATION CARD
        ===================================================== */}

        <View
          style={{
            marginTop: 22,
            padding: 16,
            borderRadius: 15,
            backgroundColor: colors.surface,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 6,
            }}
          >
            Provider information
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 19,
            }}
          >
            Your rating, completed jobs, verification status, and availability
            are managed by Sira and cannot be edited here.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// =========================================================
// REUSABLE FIELD
// =========================================================

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "phone-pad" | "numeric";
}) {
  return (
    <View
      style={{
        marginBottom: 18,
      }}
    >
      {/* LABEL */}

      <Text
        style={{
          color: colors.text,
          fontSize: 14,
          fontWeight: "700",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      {/* INPUT */}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={multiline ? "sentences" : "words"}
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          borderRadius: 14,
          paddingHorizontal: 15,
          paddingVertical: 14,
          minHeight: multiline ? 120 : 52,
          textAlignVertical: multiline ? "top" : "center",
          fontSize: 15,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      />
    </View>
  );
}
