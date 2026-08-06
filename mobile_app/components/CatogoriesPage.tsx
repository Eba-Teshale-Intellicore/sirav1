import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { addStyles } from "@/styles/add";
import { Styles } from "@/styles/category";
import { colors } from "@/styles/global";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const router = useRouter();

  const { data: categories = [], isLoading, isError } = useCategories();

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

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text }}>Failed to load categories</Text>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      {/* HEADER */}
      <View style={addStyles.header}>
        <View style={addStyles.head}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} style={addStyles.backIcon} />
          </TouchableOpacity>

          <Text style={addStyles.title}>All Categories</Text>
        </View>
      </View>

      {/* CATEGORY GRID */}
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 20,
          paddingBottom: 30,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 24,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: "31%",
              alignItems: "center",
            }}
            // onPress={() => {
            //   router.push(`/category/${item.id}`);
            // }}
            onPress={() => {
              router.push({
                pathname: "/category/[id]",
                params: { id: String(item.id) },
              });
            }}
          >
            {/* CIRCLE ICON */}
            <View style={Styles.icon}>
              <Image
                source={{
                  uri: item.icon,
                }}
                style={Styles.image}
                resizeMode="contain"
              />
            </View>

            {/* CATEGORY NAME */}
            <Text style={Styles.text} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
