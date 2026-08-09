import { addStyles } from "@/styles/add";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

export default function ProfilePage() {
  const [pimage, setPimage] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("");

  const handlePost = () => {
    const formData = new FormData();

    formData.append("bio", bio);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("experience_years", experience);
    formData.append("language", language);
    if (pimage) {
      const filename = `profile-${Date.now()}.jpg`;
      formData.append("profile_image", {
        uri: pimage,
        name: filename,
        type: "image/jpeg",
      } as any);
    }
    mutate(formData, {
      onSuccess: () => {
        alert("Profile Submited");

        setPimage(null);
        setBio("");
        setPhone("");
        setCity("");
        setExperience("");
        setLanguage("");

        router.back();
      },
      onError: (error) => {
        console.log(error);
        alert("Failed to submit Profile");
      },
    });
  };

  const router = useRouter();
  return (
    <ScrollView>
      <View>
        <View style={addStyles.header}>
          <View style={addStyles.head}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={26}
                style={addStyles.backIcon}
              />
            </TouchableOpacity>
            <Text style={addStyles.title}>Your Profile</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 42,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 32,
                fontWeight: "700",
              }}
            >
              Complete Your Profile
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                width: "85%",
                textAlign: "center",
              }}
            >
              Don't Worry, only you can see your personal data. No one
              fekrnjbhfjkdbgebikfgbeihj{" "}
            </Text>
          </View>
          <View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 30,
              }}
            >
              <View
                style={{
                  padding: 40,
                  borderRadius: 70,
                  backgroundColor: colors.textSecondary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="person" size={60} color={colors.header} />
              </View>
              <View
                style={{
                  marginTop: -30,
                  marginLeft: 60,
                  padding: 8,
                  borderRadius: 70,
                  backgroundColor: colors.header,
                }}
              >
                <Ionicons
                  name="create-outline"
                  size={25}
                  color={colors.textSecondary}
                />
              </View>
            </View>
            <View style={addStyles.form}>
              <View style={addStyles.formGroup}>
                <View style={addStyles.field}>
                  <TextInput value="bio" style={addStyles.textInput} />
                </View>
                <View style={addStyles.field}>
                  <TextInput value="phone" style={addStyles.textInput} />
                </View>
                <View style={addStyles.field}>
                  <TextInput value="city" style={addStyles.textInput} />
                </View>
                <View style={addStyles.field}>
                  <TextInput
                    value="experience_years"
                    style={addStyles.textInput}
                  />
                </View>

                <View style={addStyles.field}>
                  <TextInput value="language" style={addStyles.textInput} />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={addStyles.postButton}
                  // onPress={handlePost}
                  // disabled={isPending}
                >
                  <Text style={addStyles.postButtonText}>
                    {/* {isPending ? "Posting..." : "Post Service"}
                     */}
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
