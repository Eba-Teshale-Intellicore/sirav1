import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";

import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { colors, globalStyles, typography } from "@/styles/global";

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

  // =========================================================
  // DEFAULT CATEGORY
  // =========================================================

  useEffect(() => {
    if (categories.length > 0 && activeCategory === null) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  // =========================================================
  // SCROLL
  // =========================================================

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;

    setShowStickySearch(y >= 120);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (categoriesLoading || servicesLoading) {
    return (
      <View style={globalStyles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              typography.body,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Loading services...
          </Text>
        </View>
      </View>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <View style={globalStyles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Ionicons
            name="cloud-offline-outline"
            size={40}
            color={colors.alert}
          />

          <Text
            style={[
              typography.cardTitle,
              {
                color: colors.text,
                marginTop: 12,
              },
            ]}
          >
            Something went wrong
          </Text>

          <Text
            style={[
              typography.body,
              {
                color: colors.textSecondary,
                marginTop: 6,
                textAlign: "center",
              },
            ]}
          >
            We couldn't load the services. Please try again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* =====================================================
          STICKY SEARCH
      ====================================================== */}

      {showStickySearch && (
        <View style={[globalStyles.stickySearchContainer]}>
          <SearchBar sticky />
        </View>
      )}

      {/* =====================================================
          MAIN LIST
      ====================================================== */}

      <FlatList
        data={services}
        keyExtractor={(item) => String(item.id)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        ListHeaderComponent={
          <>
            {/* =================================================
                HEADER
            ================================================= */}

            <View style={globalStyles.header}>
              <View style={globalStyles.homeHeader}>
                {/* LOCATION */}

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={globalStyles.direction}
                  onPress={() => {
                    // TODO:
                    // open location selector
                  }}
                >
                  <Ionicons
                    name="location-outline"
                    size={30}
                    style={globalStyles.mapicon}
                  />

                  <View>
                    <Text style={globalStyles.place}>
                      Addis Ababa, Ethiopia
                    </Text>

                    <Text style={globalStyles.location}>
                      Delivering to your location
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* NOTIFICATION */}

                <TouchableOpacity
                  style={globalStyles.notification}
                  activeOpacity={0.7}
                  // onPress={() => router.push("/notifications")}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={25}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>

              {/* SEARCH */}

              <SearchBar />
            </View>

            {/* =================================================
                CATEGORIES
            ================================================= */}

            <View style={globalStyles.categories}>
              <View style={globalStyles.categoriespace}>
                <Text style={globalStyles.categoryTitle}>
                  Browse by Categories
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/categories")}
                >
                  <Text style={globalStyles.categorySubTitle}>View All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{
                  paddingRight: 10,
                }}
                renderItem={({ item }) => {
                  const iconName =
                    item.icon && !item.icon.startsWith("http")
                      ? item.icon.replace(/_/g, "-")
                      : "category";

                  return (
                    <TouchableOpacity
                      activeOpacity={0.75}
                      onPress={() => {
                        setActiveCategory(item.id);

                        router.push({
                          pathname: "/category/[id]",
                          params: {
                            id: String(item.id),
                          },
                        });
                      }}
                      style={[
                        globalStyles.categorysContainer,
                        activeCategory === item.id &&
                          globalStyles.activeCategory,
                      ]}
                    >
                      <View style={globalStyles.buttonContainer}>
                        <MaterialIcons
                          name={iconName as keyof typeof MaterialIcons.glyphMap}
                          size={24}
                          color={colors.primary}
                        />
                      </View>

                      <Text style={globalStyles.categoryName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {/* =================================================
                RECOMMENDED
            ================================================= */}

            <View style={globalStyles.popular}>
              <View style={globalStyles.categoriespace}>
                <Text style={globalStyles.categoryTitle}>
                  Recommended For You
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => router.push("/services")}
                >
                  <Text style={globalStyles.categorySubTitle}>View All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        // =====================================================
        // SERVICE
        // =====================================================

        renderItem={({ item }) => (
          <View style={globalStyles.serviceCard}>
            {/* IMAGE */}

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "/service/[id]",
                  params: {
                    id: String(item.id),
                  },
                })
              }
            >
              <Image
                source={
                  item.image_url
                    ? { uri: item.image_url }
                    : require("@/assets/images/icon.png")
                }
                style={globalStyles.serviceImage}
              />
            </TouchableOpacity>

            {/* FAVORITE */}

            <TouchableOpacity
              style={globalStyles.favoriteButton}
              activeOpacity={0.7}
              onPress={() => {
                // TODO:
                // wishlist mutation
              }}
            >
              <Ionicons name="heart-outline" size={22} color={colors.text} />
            </TouchableOpacity>

            {/* INFO */}

            <TouchableOpacity
              style={globalStyles.serviceInfo}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/service/[id]",
                  params: {
                    id: String(item.id),
                  },
                })
              }
            >
              <Text style={globalStyles.serviceTitle} numberOfLines={2}>
                {item.name}
              </Text>

              <Text style={globalStyles.servicePrice}>
                {item.starting_price
                  ? `ETB ${item.starting_price}`
                  : "Request Quote"}
              </Text>

              <View style={globalStyles.serviceLocationRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color={colors.primary}
                />

                <Text style={globalStyles.serviceLocation}>Addis Ababa</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        // =====================================================
        // EMPTY
        // =====================================================

        ListEmptyComponent={
          <View
            style={{
              paddingVertical: 50,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="search-outline"
              size={42}
              color={colors.textSecondary}
            />

            <Text
              style={[
                typography.cardTitle,
                {
                  color: colors.text,
                  marginTop: 12,
                },
              ]}
            >
              No services yet
            </Text>

            <Text
              style={[
                typography.body,
                {
                  color: colors.textSecondary,
                  marginTop: 5,
                  textAlign: "center",
                },
              ]}
            >
              Try another category or check back later.
            </Text>
          </View>
        }
      />
    </View>
  );
};

// =========================================================
// SEARCH BAR
// =========================================================

function SearchBar({ sticky = false }: { sticky?: boolean }) {
  return (
    <View
      style={[
        globalStyles.searchContainer,
        sticky && globalStyles.stickySearch,
      ]}
    >
      <View
        style={[
          globalStyles.searchInput,
          sticky && globalStyles.stickySearchInput,
        ]}
      >
        <Ionicons
          name="search-outline"
          size={20}
          style={globalStyles.searchIcon}
        />

        <TextInput
          placeholder="Search services..."
          placeholderTextColor={colors.textSecondary}
          style={globalStyles.textInput}
        />

        <TouchableOpacity
          style={globalStyles.filterIconContainer}
          activeOpacity={0.7}
        >
          <Ionicons
            name="options-outline"
            size={21}
            style={globalStyles.filterIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
