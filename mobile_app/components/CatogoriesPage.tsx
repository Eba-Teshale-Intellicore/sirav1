import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { addStyles } from "@/styles/add";
// import
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
          <TouchableOpacity
            style={addStyles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>

          <View style={addStyles.titleContainer}>
            <Text style={addStyles.title}>All Categories</Text>

            <Text style={addStyles.subtitle}>Find the service you need</Text>
          </View>
        </View>
      </View>

      {/* CATEGORY GRID */}
      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styles.grid}
        columnWrapperStyle={Styles.column}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.75}
            style={Styles.item}
            onPress={() => {
              router.push({
                pathname: "/category/[id]",
                params: {
                  id: String(item.id),
                },
              });
            }}
          >
            <View style={Styles.icon}>
              <MaterialIcons
                name={
                  item.icon.replace(
                    /_/g,
                    "-",
                  ) as keyof typeof MaterialIcons.glyphMap
                }
                size={30}
                color={colors.primary}
              />
            </View>

            <Text style={Styles.text} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
