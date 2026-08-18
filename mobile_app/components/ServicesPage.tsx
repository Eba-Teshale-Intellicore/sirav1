import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useServices } from "@/hooks/useCategories";
import { colors, typography } from "@/styles/global";
import { serviceStyles } from "@/styles/service";

export default function ServicesPage() {
  const router = useRouter();

  const { data: services = [], isLoading, isError, error } = useServices();

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <View style={serviceStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={serviceStyles.loadingText}>Loading services...</Text>
      </View>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {
    return (
      <View style={serviceStyles.errorContainer}>
        <View style={serviceStyles.errorIcon}>
          <Ionicons
            name="cloud-offline-outline"
            size={30}
            color={colors.primary}
          />
        </View>

        <Text style={serviceStyles.errorTitle}>Couldn't load services</Text>

        <Text style={serviceStyles.errorText}>
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </Text>

        <TouchableOpacity
          style={serviceStyles.backButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={18} color={colors.primary} />

          <Text style={serviceStyles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // =========================================================
  // SERVICE CARD
  // =========================================================

  const renderService = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={serviceStyles.card}
        onPress={() => {
          router.push({
            pathname: "/service/[id]",
            params: {
              id: String(item.id),
            },
          });
        }}
      >
        {/* IMAGE */}

        <View style={serviceStyles.imageContainer}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={serviceStyles.image}
            />
          ) : (
            <View style={serviceStyles.imagePlaceholder}>
              <Ionicons
                name="briefcase-outline"
                size={38}
                color={colors.primary}
              />
            </View>
          )}

          {/* FAVORITE */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={serviceStyles.favoriteButton}
            onPress={(event) => {
              event.stopPropagation();
              console.log("Favorite:", item.id);
            }}
          >
            <Ionicons name="heart-outline" size={21} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* CONTENT */}

        <View style={serviceStyles.content}>
          {/* CATEGORY */}

          <Text style={serviceStyles.category} numberOfLines={1}>
            {item.category_name || "Service"}
          </Text>

          {/* TITLE */}

          <Text style={serviceStyles.title} numberOfLines={2}>
            {item.name}
          </Text>

          {/* PRICE */}

          <View style={serviceStyles.priceRow}>
            <Text style={serviceStyles.price}>
              {item.starting_price
                ? `ETB ${item.starting_price}`
                : "Request Quote"}
            </Text>

            {item.price_type === "hourly" && (
              <Text style={serviceStyles.priceType}>/ hour</Text>
            )}
          </View>

          {/* LOCATION */}

          <View style={serviceStyles.locationRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color={colors.primary}
            />

            <Text style={serviceStyles.location} numberOfLines={1}>
              {item.city || "Available near you"}
            </Text>
          </View>
        </View>

        {/* ARROW */}

        <View style={serviceStyles.arrow}>
          <Ionicons
            name="chevron-forward"
            size={19}
            color={colors.textSecondary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <View style={serviceStyles.container}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={serviceStyles.header}>
        <View style={serviceStyles.headerRow}>
          <TouchableOpacity
            style={serviceStyles.backButtonCircle}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </TouchableOpacity>

          <View style={serviceStyles.headerContent}>
            <Text
              style={[
                typography.pageTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              All Services
            </Text>

            <Text style={serviceStyles.headerSubtitle}>
              Find the right service for you
            </Text>
          </View>
        </View>
      </View>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <FlatList
        data={services}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderService}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={serviceStyles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <View style={serviceStyles.emptyContainer}>
            <View style={serviceStyles.emptyIcon}>
              <Ionicons
                name="briefcase-outline"
                size={32}
                color={colors.primary}
              />
            </View>

            <Text style={serviceStyles.emptyTitle}>No services yet</Text>

            <Text style={serviceStyles.emptyText}>
              There are currently no services available.
            </Text>
          </View>
        }
      />
    </View>
  );
}
