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

    if (priceType !== "quote" && startingPrice) {
      formData.append("starting_price", startingPrice);
    }
    formData.append("price_type", priceType);

    if (priceType !== "quote" && startingPrice) {
      formData.append("starting_price", startingPrice);
    }
    formData.append("is_active", "true");

    if (image) {
      const filename = `service-${Date.now()}.jpg`;
      formData.append("image", {
        uri: image,
        name: filename,
        type: "image/jpeg",
      } as any);
    }
    if (!title.trim()) {
      alert("Please enter a service title.");
      return;
    }

    if (!category) {
      alert("Please select a category.");
      return;
    }

    if (!desc.trim()) {
      alert("Please describe your service.");
      return;
    }

    if (!priceType) {
      alert("Please select a price type.");
      return;
    }

    if (priceType !== "quote" && !startingPrice) {
      alert("Please enter a starting price.");
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

      onError: (error) => {
        console.log(error);
        alert("Failed to post service.");
      },
      // onError: (error: any) => {
      //   console.log(error.response?.data);
      //   console.log(error.response?.status);
      // },
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
    <View style={addStyles.container}>
      {/* =====================================================
        HEADER
    ===================================================== */}

      <View style={addStyles.header}>
        <View style={addStyles.head}>
          <TouchableOpacity
            style={addStyles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} style={addStyles.backIcon} />
          </TouchableOpacity>

          <View style={addStyles.titleContainer}>
            <Text style={addStyles.title}>Post a Service</Text>

            <Text style={addStyles.subtitle}>
              Offer your service to customers
            </Text>
          </View>
        </View>
      </View>

      {/* =====================================================
        FORM
    ===================================================== */}

      <ScrollView style={addStyles.form} showsVerticalScrollIndicator={false}>
        <View style={addStyles.formGroup}>
          {/* =================================================
            SERVICE DETAILS
        ================================================= */}

          <View style={addStyles.section}>
            <View style={addStyles.sectionHeader}>
              <Text style={addStyles.sectionTitle}>Service Details</Text>

              <Text style={addStyles.sectionSubtitle}>
                Tell customers what you offer
              </Text>
            </View>

            {/* TITLE */}

            <View
              style={[addStyles.field, titleFocused && addStyles.fieldFocused]}
            >
              {(titleFocused || title.length > 0) && (
                <Text style={addStyles.floatingLabel}>Service Title</Text>
              )}

              <TextInput
                value={title}
                onChangeText={setTitle}
                onFocus={() => setTitleFocused(true)}
                onBlur={() => setTitleFocused(false)}
                placeholder={titleFocused ? "" : "Service title"}
                placeholderTextColor={colors.textSecondary}
                style={addStyles.textInput}
              />
            </View>

            {/* CATEGORY */}

            <View style={addStyles.field}>
              {category !== "" && (
                <Text style={addStyles.floatingLabel}>Category</Text>
              )}

              <View style={addStyles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(value) => setCategory(value)}
                  dropdownIconColor={colors.primary}
                  style={addStyles.picker}
                >
                  <Picker.Item label="Select Category" value="" />

                  {categories.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.name}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            {/* DESCRIPTION */}

            <View
              style={[addStyles.field, descFocused && addStyles.fieldFocused]}
            >
              {(descFocused || desc.length > 0) && (
                <Text style={addStyles.floatingLabel}>Description</Text>
              )}

              <TextInput
                value={desc}
                onChangeText={setDesc}
                onFocus={() => setDescFocused(true)}
                onBlur={() => setDescFocused(false)}
                placeholder={descFocused ? "" : "Describe your service..."}
                placeholderTextColor={colors.textSecondary}
                style={addStyles.textArea}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* =================================================
            SERVICE IMAGE
        ================================================= */}

          <View style={addStyles.section}>
            <View style={addStyles.sectionHeader}>
              <Text style={addStyles.sectionTitle}>Service Image</Text>

              <Text style={addStyles.sectionSubtitle}>
                Add a clear image to attract customers
              </Text>
            </View>

            <TouchableOpacity
              style={[
                addStyles.imageField,
                image && addStyles.imageFieldActive,
              ]}
              activeOpacity={0.8}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={addStyles.previewImage} />
              ) : (
                <>
                  <View style={addStyles.imageIconContainer}>
                    <Ionicons
                      name="camera-outline"
                      size={30}
                      color={colors.primary}
                    />
                  </View>

                  <Text style={addStyles.imageTitle}>Upload service image</Text>

                  <Text style={addStyles.imageSubtitle}>
                    JPG or PNG • Max 5 MB
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* =================================================
            PRICING
        ================================================= */}

          <View style={addStyles.section}>
            <View style={addStyles.sectionHeader}>
              <Text style={addStyles.sectionTitle}>Pricing</Text>

              <Text style={addStyles.sectionSubtitle}>
                Set how customers will be charged
              </Text>
            </View>

            {/* PRICE TYPE */}

            <View style={addStyles.field}>
              {priceType !== "" && (
                <Text style={addStyles.floatingLabel}>Price Type</Text>
              )}

              <View style={addStyles.pickerContainer}>
                <Picker
                  selectedValue={priceType}
                  onValueChange={(value) => setPriceType(value)}
                  dropdownIconColor={colors.primary}
                  style={addStyles.picker}
                >
                  <Picker.Item label="Select Price Type" value="" />

                  <Picker.Item label="Hourly" value="hourly" />

                  <Picker.Item label="Fixed Price" value="fixed" />

                  <Picker.Item label="Request Quote" value="quote" />
                </Picker>
              </View>
            </View>

            {/* STARTING PRICE */}

            <View
              style={[addStyles.field, priceFocused && addStyles.fieldFocused]}
            >
              {(priceFocused || startingPrice.length > 0) && (
                <Text style={addStyles.floatingLabel}>Starting Price</Text>
              )}

              <TextInput
                value={startingPrice}
                onChangeText={setStartingPrice}
                onFocus={() => setPriceFocused(true)}
                onBlur={() => setPriceFocused(false)}
                placeholder={priceFocused ? "" : "Starting price"}
                placeholderTextColor={colors.textSecondary}
                style={addStyles.textInput}
                keyboardType="numeric"
              />
            </View>

            <Text style={addStyles.helperText}>
              Customers will see this as the starting price.
            </Text>
          </View>

          {/* =================================================
            PUBLISH
        ================================================= */}

          <TouchableOpacity
            style={addStyles.postButton}
            activeOpacity={0.85}
            onPress={handlePost}
            disabled={isPending}
          >
            <Text style={addStyles.postButtonText}>
              {isPending ? "Publishing..." : "Publish Service"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
