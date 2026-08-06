import { addStyles } from "@/styles/add";
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
import { useCategories } from "@/hooks/useCategories";

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
    <ScrollView style={addStyles.container}>
      <View style={addStyles.header}>
        <View style={addStyles.head}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} style={addStyles.backIcon} />
          </TouchableOpacity>
          <Text style={addStyles.title}>Post your Service</Text>
        </View>
      </View>
      <View style={addStyles.form}>
        <View style={addStyles.formGroup}>
          <View style={addStyles.field}>
            {(titleFocused || title.length > 0) && (
              <Text style={addStyles.floatingLabel}>Title</Text>
            )}
            <TextInput
              value={title}
              onChangeText={setTitle}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              placeholder={titleFocused ? "" : "Title"}
              placeholderTextColor={colors.textSecondary}
              style={addStyles.textInput}
            />
          </View>
          <View style={addStyles.field}>
            {category !== "" && (
              <Text style={addStyles.floatingLabel}>Category</Text>
            )}
            <Picker
              selectedValue={category}
              onValueChange={(value) => setCategory(value)}
              dropdownIconColor={colors.primary}
              style={{ color: colors.text }}
            >
              <Picker.Item label="Select Category" value="" />

              {categories.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          <View style={addStyles.field}>
            {(descFocused || desc.length > 0) && (
              <Text style={addStyles.floatingLabel}>Description</Text>
            )}

            <TextInput
              value={desc}
              onChangeText={setDesc}
              onFocus={() => setDescFocused(true)}
              onBlur={() => setDescFocused(false)}
              placeholder={descFocused ? "" : "Description"}
              placeholderTextColor={colors.textSecondary}
              style={addStyles.textArea}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          <View style={addStyles.field}>
            {image && (
              <Text style={addStyles.floatingLabel}>Service Image</Text>
            )}

            <TouchableOpacity style={addStyles.imageField} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={addStyles.previewImage} />
              ) : (
                <>
                  <Ionicons
                    name="camera-outline"
                    size={42}
                    color={colors.textSecondary}
                  />

                  <Text style={addStyles.imageTitle}>Tap to upload image</Text>

                  <Text style={addStyles.imageSubtitle}>
                    JPG • PNG • Max 5 MB
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <View style={addStyles.field}>
            {priceType !== "" && (
              <Text style={addStyles.floatingLabel}>Price Type</Text>
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
          <View style={addStyles.field}>
            {(titleFocused || title.length > 0) && (
              <Text style={addStyles.floatingLabel}>Starting Price</Text>
            )}
            <TextInput
              value={startingPrice}
              onChangeText={setStartingPrice}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              placeholder={titleFocused ? "" : "Starting Price"}
              placeholderTextColor={colors.textSecondary}
              style={addStyles.textInput}
            />
          </View>
          <View>
            <TouchableOpacity
              style={addStyles.postButton}
              onPress={handlePost}
              disabled={isPending}
            >
              <Text style={addStyles.postButtonText}>
                {isPending ? "Posting..." : "Post Service"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
