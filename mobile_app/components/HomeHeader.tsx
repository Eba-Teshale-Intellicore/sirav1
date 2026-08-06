import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

import { colors, globalStyles } from "@/styles/global";
import { useRouter } from "expo-router";
import { useCategories, useServices } from "@/hooks/useCategories";

export const HomeHeader = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showStickySearch, setShowStickySearch] = useState(false);

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const {
    data: services = [],
    isLoading: servicesLoading,
    error,
  } = useServices();

  useEffect(() => {
    if (categories.length > 0 && activeCategory === null) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const filteredServices =
    activeCategory === null
      ? services
      : services.filter((service) => service.category === activeCategory);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;

    // Change this number depending on your header height
    if (y >= 120) {
      setShowStickySearch(true);
    } else {
      setShowStickySearch(false);
    }
  };

  if (categoriesLoading || servicesLoading) {
    return (
      <View style={globalStyles.container}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.container}>
        <Text style={{ color: "red" }}>Failed to load services.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* =====================================================
          STICKY SEARCH
      ====================================================== */}

      {showStickySearch && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: colors.header,
          }}
        >
          <SearchBar />
        </View>
      )}

      {/* =====================================================
          MAIN VERTICAL LIST
      ====================================================== */}

      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* HEADER */}

            <View style={globalStyles.header}>
              <View style={globalStyles.homeHeader}>
                <View>
                  <Text style={globalStyles.location}>Location</Text>

                  <View style={globalStyles.direction}>
                    <Ionicons
                      name="location-outline"
                      size={20}
                      style={globalStyles.mapicon}
                    />

                    <Text style={globalStyles.place}>
                      Addis Ababa, Ethiopia
                    </Text>
                  </View>
                </View>

                <TouchableOpacity style={globalStyles.notification}>
                  <Ionicons
                    name="notifications-outline"
                    size={28}
                    style={globalStyles.notificationIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* NORMAL SEARCH */}

              <SearchBar />
            </View>

            {/* CATEGORIES */}

            <View style={globalStyles.categories}>
              <View style={globalStyles.categoriespace}>
                <Text style={globalStyles.categoryTitle}>
                  Service Categories
                </Text>
                <TouchableOpacity onPress={() => router.push("/categories")}>
                  <Text style={globalStyles.categorySubTitle}>See All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setActiveCategory(item.id)}
                    style={[
                      globalStyles.categorysContainer,

                      activeCategory === item.id && globalStyles.activeCategory,
                    ]}
                  >
                    <View style={globalStyles.buttonContainer}>
                      <Image
                        source={{ uri: item.icon }}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                        }}
                      />
                    </View>

                    <Text style={globalStyles.textInput2}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* POPULAR TITLE */}

            <View style={globalStyles.popular}>
              <View style={globalStyles.categoriespace}>
                <Text style={globalStyles.categoryTitle}>Popular Services</Text>

                <TouchableOpacity onPress={() => router.push("/services")}>
                  <Text style={globalStyles.categorySubTitle}>See All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
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

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={colors.primary}
                />
              </View>
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
};

/* =========================================================
   SEARCH COMPONENT
========================================================= */

function SearchBar() {
  return (
    <View style={globalStyles.searchContainer}>
      <View style={globalStyles.searchInput}>
        <Ionicons name="search-outline" size={20} color={colors.primary} />

        <TextInput
          placeholder="Search"
          placeholderTextColor={colors.textSecondary}
          style={globalStyles.textInput}
        />
      </View>

      <TouchableOpacity style={globalStyles.filterIconContainer}>
        <Ionicons
          name="options-outline"
          size={22}
          style={globalStyles.filterIcon}
        />
      </TouchableOpacity>
    </View>
  );
}
