import { globalStyles } from "@/styles/add";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/service";
import { useCategories } from "./HomeHeader";

export function usePostService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService,

    onSuccess: (data) => {
      console.log("POST SUCCESS:", data);

      queryClient.invalidateQueries({
        queryKey: ["services"],
        exact: true,
      });
    },
  });
}

export default function AddPage() {
  const { data: categories = [] } = useCategories();
  const [title, setTitle] = useState("");
  const [titleFocused, setTitleFocused] = useState(false);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [descFocused, setDescFocused] = useState(false);
  const [priceType, setPriceType] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [startingPrice, setStartingPrice] = useState("");
  const [priceFocused, setPriceFocused] = useState(false);
  const { mutate, isPending } = usePostService();
  const router = useRouter();

  const handlePost = () => {
    const formData = new FormData();

    formData.append("name", title);
    formData.append("description", desc);
    formData.append("category", category);
    formData.append("price_type", priceType);
    formData.append("starting_price", startingPrice);
    formData.append("is_active", "true");

    if (image) {
      const filename = `service-${Date.now()}.jpg`;
      formData.append("image", {
        uri: image,
        name: filename,
        type: "image/jpeg",
      } as any);
    }
    if (!category) {
      alert("Please select a category.");
      return;
    }
    console.log({
      title,
      category,
      desc,
      priceType,
      startingPrice,
      image,
    });
    console.log("Selected category:", category);
    mutate(formData, {
      onSuccess: () => {
        alert("Service posted!");

        setTitle("");
        setDesc("");
        setCategory("");
        setPriceType("");
        setStartingPrice("");
        setImage(null);

        router.back();
      },

      // onError: (error) => {
      //   console.log(error);
      //   alert("Failed to post service.");
      // },
      onError: (error: any) => {
        console.log(error.response?.data);
        console.log(error.response?.status);
      },
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.head}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={26}
              style={globalStyles.backIcon}
            />
          </TouchableOpacity>
          <Text style={globalStyles.title}>Post your Service</Text>
        </View>
      </View>
      <View style={globalStyles.form}>
        <View style={globalStyles.formGroup}>
          <View style={globalStyles.field}>
            {(titleFocused || title.length > 0) && (
              <Text style={globalStyles.floatingLabel}>Title</Text>
            )}
            <TextInput
              value={title}
              onChangeText={setTitle}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              placeholder={titleFocused ? "" : "Title"}
              placeholderTextColor={colors.textSecondary}
              style={globalStyles.textInput}
            />
          </View>
          <View style={globalStyles.field}>
            {category !== "" && (
              <Text style={globalStyles.floatingLabel}>Category</Text>
            )}
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              dropdownIconColor={colors.primary}
              style={{ color: colors.text }}
            >
              {/* <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Cleaning" value="Cleaning" />
              <Picker.Item label="Plumbing" value="Plumbing" />
              <Picker.Item label="Electrical" value="Electrical" />
              <Picker.Item label="Moving" value="Moving" /> */}
              <Picker.Item label="Select Category" value="" />

              {categories.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          <View style={globalStyles.field}>
            {(descFocused || desc.length > 0) && (
              <Text style={globalStyles.floatingLabel}>Description</Text>
            )}

            <TextInput
              value={desc}
              onChangeText={setDesc}
              onFocus={() => setDescFocused(true)}
              onBlur={() => setDescFocused(false)}
              placeholder={descFocused ? "" : "Description"}
              placeholderTextColor={colors.textSecondary}
              style={globalStyles.textArea}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={globalStyles.field}>
            {image && (
              <Text style={globalStyles.floatingLabel}>Service Image</Text>
            )}

            <TouchableOpacity
              style={globalStyles.imageField}
              onPress={pickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={globalStyles.previewImage}
                />
              ) : (
                <>
                  <Ionicons
                    name="camera-outline"
                    size={42}
                    color={colors.textSecondary}
                  />

                  <Text style={globalStyles.imageTitle}>
                    Tap to upload image
                  </Text>

                  <Text style={globalStyles.imageSubtitle}>
                    JPG • PNG • Max 5 MB
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={globalStyles.field}>
            {priceType !== "" && (
              <Text style={globalStyles.floatingLabel}>Price Type</Text>
            )}
            <Picker
              selectedValue={priceType}
              onValueChange={(value) => setPriceType(value)}
              dropdownIconColor={colors.primary}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Select Price Type" value="" />
              <Picker.Item label="Hourly" value="hourly" />
              <Picker.Item label="Fixed Price" value="fixed" />
              <Picker.Item label="Request Quote" value="quote" />
            </Picker>
          </View>
          <View style={globalStyles.field}>
            {(titleFocused || title.length > 0) && (
              <Text style={globalStyles.floatingLabel}>Starting Price</Text>
            )}
            <TextInput
              value={startingPrice}
              onChangeText={setStartingPrice}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              placeholder={titleFocused ? "" : "Starting Price"}
              placeholderTextColor={colors.textSecondary}
              style={globalStyles.textInput}
            />
          </View>
          <View>
            <TouchableOpacity
              style={globalStyles.postButton}
              onPress={handlePost}
              disabled={isPending}
            >
              <Text style={globalStyles.postButtonText}>
                {isPending ? "Posting..." : "Post Service"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
