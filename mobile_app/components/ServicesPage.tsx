import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useServices } from "@/hooks/useCategories";
import { TouchableOpacity, View, Text, Image, FlatList } from "react-native";
import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { addStyles } from "@/styles/add";

export default function ServicesPage() {
  const router = useRouter();

  // const { data: services = [], isLoading, isError } = useServices();
  const {
    data: services = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useServices();

  console.log("SERVICES:", services);
  console.log("SERVICES SUCCESS:", isSuccess);
  console.log("SERVICES ERROR:", error);

  const [headerHeight, setHeaderHeight] = useState(0);

  // Loading
  if (isLoading) {
    return (
      <View style={globalStyles.container}>
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
          }}
        >
          Loading services...
        </Text>
      </View>
    );
  }

  // Error
  if (isError) {
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
          Failed to load services.
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 10,
          }}
        >
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* FIXED HEADER */}
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          elevation: 10,
        }}
      >
        <View style={globalStyles.header}>
          <View style={addStyles.head}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={26}
                color={colors.text}
                style={addStyles.backIcon}
              />
            </TouchableOpacity>

            <Text style={addStyles.title}>All Services</Text>
          </View>
        </View>
      </View>

      {/* SERVICES */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: 30,
        }}
        renderItem={({ item }) => (
          <View style={globalStyles.serviceCard}>
            <Image
              source={{ uri: item.image }}
              style={globalStyles.serviceImage}
            />

            <TouchableOpacity style={globalStyles.favoriteButton}>
              <Ionicons name="heart-outline" size={22} color={colors.text} />
            </TouchableOpacity>

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
          <View style={{ padding: 20 }}>
            <Text style={{ color: colors.text }}>No services available.</Text>
          </View>
        }
      />
    </View>
  );
}
