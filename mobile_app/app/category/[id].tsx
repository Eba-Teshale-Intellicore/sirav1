import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCategories } from "@/hooks/useCategories";
import { TouchableOpacity, View, Text, Image, FlatList } from "react-native";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";

export default function CategoriesDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: categories = [] } = useCategories();

  const [headerHeight, setHeaderHeight] = useState(0);

  const category = categories.find((item) => item.id.toString() === id);

  if (!category) {
    return (
      <View style={globalStyles.container}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </TouchableOpacity>

        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            marginTop: 20,
          }}
        >
          Category not found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* =========================
          FIXED / ABSOLUTE HEADER
         ========================= */}
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
        style={[
          globalStyles.header,
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,

            // Layering
            zIndex: 10,
            elevation: 10,
          },
        ]}
      >
        <View style={globalStyles.homeHeader}>
          {/* BACK BUTTON */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color={colors.text} />
          </TouchableOpacity>

          {/* CATEGORY INFO */}
          <View
            style={{
              flex: 1,
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {category.name}
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                marginTop: 3,
              }}
            >
              {category.services.length} services
            </Text>
          </View>
        </View>
      </View>

      {/* =========================
          SERVICES LIST
         ========================= */}
      <FlatList
        data={category.services}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // Push first service below the absolute header
          paddingTop: headerHeight,
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <View style={globalStyles.serviceCard}>
            {/* SERVICE IMAGE */}
            <Image
              source={{ uri: item.image }}
              style={globalStyles.serviceImage}
            />

            {/* FAVORITE */}
            <TouchableOpacity style={globalStyles.favoriteButton}>
              <Ionicons name="heart-outline" size={22} color={colors.text} />
            </TouchableOpacity>

            {/* SERVICE INFO */}
            <View style={globalStyles.serviceInfo}>
              <Text style={globalStyles.serviceTitle}>{item.name}</Text>

              <Text style={globalStyles.servicePrice}>
                ETB {item.starting_price}
              </Text>

              <Ionicons
                name="location-outline"
                size={16}
                color={colors.primary}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.text,
              padding: 20,
            }}
          >
            No services available.
          </Text>
        }
      />
    </View>
  );
}
