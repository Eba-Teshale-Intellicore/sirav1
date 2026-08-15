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

  const { data: provider, isLoading, isError } = useMyProviderProfile();

  const updateProvider = useUpdateMyProviderProfile();

  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");

  // -----------------------------------------
  // LOAD PROVIDER DATA
  // -----------------------------------------

  useEffect(() => {
    if (!provider) return;

    setBio(provider.bio ?? "");
    setPhone(provider.phone ?? "");
    setCity(provider.city ?? "");
    setAddress(provider.address ?? "");

    setExperience(
      provider.experience_years !== undefined &&
        provider.experience_years !== null
        ? String(provider.experience_years)
        : "",
    );

    setLanguages(provider.languages ?? "");
  }, [provider]);

  // -----------------------------------------
  // SAVE
  // -----------------------------------------

  const handleSave = () => {
    if (!phone.trim()) {
      Alert.alert("Missing information", "Please enter your phone number.");
      return;
    }

    if (!city.trim()) {
      Alert.alert("Missing information", "Please enter your city.");
      return;
    }

    if (!bio.trim()) {
      Alert.alert(
        "Missing information",
        "Please tell customers about yourself.",
      );
      return;
    }

    const experienceYears = Number(experience);

    if (
      experience.trim() &&
      (Number.isNaN(experienceYears) || experienceYears < 0)
    ) {
      Alert.alert(
        "Invalid experience",
        "Please enter a valid number of years.",
      );
      return;
    }

    console.log("UPDATING PROVIDER PROFILE:", {
      bio: bio.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: address.trim(),
      experience_years: experienceYears || 0,
      languages: languages.trim(),
    });

    updateProvider.mutate(
      {
        bio: bio.trim(),
        phone: phone.trim(),
        city: city.trim(),
        address: address.trim(),
        experience_years: experienceYears || 0,
        languages: languages.trim(),
      },

      {
        onSuccess: async (updatedProvider) => {
          console.log("PROVIDER PROFILE UPDATED:", updatedProvider);

          Alert.alert(
            "Profile Updated",
            "Your provider profile has been updated successfully.",
            [
              {
                text: "OK",
                onPress: () => router.back(),
              },
            ],
          );
        },

        onError: (error: any) => {
          console.log(
            "PROVIDER PROFILE UPDATE ERROR:",
            error?.response?.data || error,
          );

          Alert.alert(
            "Update failed",
            "We couldn't update your provider profile.",
          );
        },
      },
    );
  };

  // -----------------------------------------
  // LOADING
  // -----------------------------------------

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

  // -----------------------------------------
  // ERROR
  // -----------------------------------------

  if (isError && !provider) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Provider profile could not be loaded
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Please try again.
        </Text>

        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 20,
            backgroundColor: colors.primary,
            paddingHorizontal: 25,
            paddingVertical: 14,
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              color: colors.background,
              fontWeight: "700",
            }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // -----------------------------------------
  // UI
  // -----------------------------------------

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
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* BACK */}

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
              fontWeight: "600",
            }}
          >
            ← Back
          </Text>
        </TouchableOpacity>

        {/* TITLE */}

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
          Update the information customers see when they view your provider
          profile.
        </Text>

        {/* BIO */}

        <Field
          label="About You"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell customers about your experience and skills..."
          multiline
        />

        {/* PHONE */}

        <Field
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="+251 9XX XXX XXX"
          keyboardType="phone-pad"
        />

        {/* CITY */}

        <Field
          label="City"
          value={city}
          onChangeText={setCity}
          placeholder="Addis Ababa"
        />

        {/* ADDRESS */}

        <Field
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Your area or neighborhood"
        />

        {/* EXPERIENCE */}

        <Field
          label="Experience"
          value={experience}
          onChangeText={setExperience}
          placeholder="Example: 3"
          keyboardType="numeric"
        />

        {/* LANGUAGES */}

        <Field
          label="Languages"
          value={languages}
          onChangeText={setLanguages}
          placeholder="Amharic, Afaan Oromo, English"
        />

        {/* SAVE */}

        <TouchableOpacity
          onPress={handleSave}
          disabled={updateProvider.isPending}
          style={{
            marginTop: 12,
            paddingVertical: 17,
            borderRadius: 15,
            backgroundColor: colors.primary,
            alignItems: "center",
            opacity: updateProvider.isPending ? 0.6 : 1,
          }}
        >
          {updateProvider.isPending ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Text
              style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Save Provider Profile
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
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 13,
              lineHeight: 19,
              textAlign: "center",
            }}
          >
            Your provider rating, completed jobs, verification status, and
            availability are managed by Sira and cannot be edited here.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// -----------------------------------------
// REUSABLE FIELD
// -----------------------------------------

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
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 14,
          fontWeight: "600",
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
        multiline={multiline}
        keyboardType={keyboardType}
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          borderRadius: 14,
          paddingHorizontal: 15,
          paddingVertical: 14,
          minHeight: multiline ? 120 : 52,
          textAlignVertical: multiline ? "top" : "center",
          fontSize: 15,
        }}
      />
    </View>
  );
}
