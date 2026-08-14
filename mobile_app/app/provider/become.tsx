import React, { useState } from "react";
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

export default function BecomeProviderPage() {
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleBecomeProvider = async () => {
    if (!phone.trim()) {
      Alert.alert("Missing information", "Please enter your phone number.");
      return;
    }

    if (!city.trim()) {
      Alert.alert("Missing information", "Please enter your city.");
      return;
    }

    if (!bio.trim()) {
      Alert.alert("Missing information", "Please tell customers about yourself.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("bio", bio.trim());
      formData.append("phone", phone.trim());
      formData.append("city", city.trim());
      formData.append("address", address.trim());
      formData.append(
        "experience_years",
        experience.trim() || "0"
      );
      formData.append("languages", languages.trim());

      // TODO:
      // Replace this with your real provider API mutation.
      //
      // await createProviderProfile(formData);

      console.log("BECOME PROVIDER DATA:", {
        bio,
        phone,
        city,
        address,
        experience,
        languages,
      });

      Alert.alert(
        "Ready to become a provider",
        "Your provider application is ready to be submitted.",
        [
          {
            text: "Continue",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.error("BECOME PROVIDER ERROR:", error);

      Alert.alert(
        "Something went wrong",
        "We couldn't submit your provider application."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          paddingBottom: 50,
        }}
      >
        {/* Header */}

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

        <Text
          style={{
            color: colors.text,
            fontSize: 30,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          Become a Provider
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 28,
          }}
        >
          Offer your skills and services to people around you through Sira.
        </Text>

        {/* Bio */}

        <Field
          label="About You"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell customers about your experience and skills..."
          multiline
        />

        {/* Phone */}

        <Field
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="+251 9XX XXX XXX"
          keyboardType="phone-pad"
        />

        {/* City */}

        <Field
          label="City"
          value={city}
          onChangeText={setCity}
          placeholder="Addis Ababa"
        />

        {/* Address */}

        <Field
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Your area or neighborhood"
        />

        {/* Experience */}

        <Field
          label="Experience"
          value={experience}
          onChangeText={setExperience}
          placeholder="Example: 3"
          keyboardType="numeric"
        />

        {/* Languages */}

        <Field
          label="Languages"
          value={languages}
          onChangeText={setLanguages}
          placeholder="Amharic, Afaan Oromo, English"
        />

        {/* Submit */}

        <TouchableOpacity
          onPress={handleBecomeProvider}
          disabled={submitting}
          style={{
            marginTop: 12,
            paddingVertical: 17,
            borderRadius: 15,
            backgroundColor: colors.primary,
            alignItems: "center",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? (
            <ActivityIndicator
              size="small"
              color={colors.background}
            />
          ) : (
            <Text
              style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Become a Provider
            </Text>
          )}
        </TouchableOpacity>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            textAlign: "center",
            marginTop: 15,
            lineHeight: 18,
          }}
        >
          You can update your provider information later from your
          provider profile.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------------------------------- */
/* Reusable Field */
/* ---------------------------------- */

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