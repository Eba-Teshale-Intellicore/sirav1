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

import {
  useMyProviderProfile,
  useUpdateProviderProfile,
} from "@/hooks/useProviderProfile";

import { colors } from "@/styles/global";

export default function EditProfilePage() {
  const router = useRouter();

  const { data: profile, isLoading } = useMyProviderProfile();

  const updateProfile = useUpdateProviderProfile();

  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");

  useEffect(() => {
    if (!profile) return;

    setBio(profile.bio ?? "");
    setPhone(profile.phone ?? "");
    setCity(profile.city ?? "");
    setAddress(profile.address ?? "");
    setExperience(String(profile.experience_years ?? ""));
    setLanguages(profile.languages ?? "");
  }, [profile]);

  const handleSave = () => {
    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("experience_years", experience || "0");
    formData.append("languages", languages);

    updateProfile.mutate(formData, {
      onSuccess: () => {
        router.back();
      },

      onError: (error) => {
        console.log("PROFILE UPDATE ERROR:", error);
      },
    });
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

      <Field label="Bio" value={bio} onChangeText={setBio} multiline />

      <Field
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Field label="City" value={city} onChangeText={setCity} />

      <Field label="Address" value={address} onChangeText={setAddress} />

      <Field
        label="Experience (years)"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
      />

      <Field
        label="Languages"
        value={languages}
        onChangeText={setLanguages}
        placeholder="Amharic, Afaan Oromo, English"
      />

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
  multiline = false,
  keyboardType,
  placeholder,
}: any) {
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
        multiline={multiline}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={{
          backgroundColor: colors.surface,
          color: colors.text,
          borderRadius: 14,
          padding: 15,
          minHeight: multiline ? 110 : 52,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    </View>
  );
}
