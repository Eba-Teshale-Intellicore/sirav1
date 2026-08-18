import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { useCategories } from "@/hooks/useCategories";
import { colors, typography } from "@/styles/global";
import { Styles } from "@/styles/categoryDetail";

export default function CategoriesDetailPage() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: categories = [], isLoading } = useCategories();

  const [headerHeight, setHeaderHeight] = useState(0);

  const category = categories.find((item) => String(item.id) === String(id));

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={Styles.loadingText}>Loading category...</Text>
      </View>
    );
  }

  /* =====================================================
     NOT FOUND
  ===================================================== */

  if (!category) {
    return (
      <View style={Styles.notFoundContainer}>
        <View style={Styles.notFoundIcon}>
          <Ionicons name="grid-outline" size={32} color={colors.primary} />
        </View>

        <Text style={Styles.notFoundTitle}>Category not found</Text>

        <Text style={Styles.notFoundDescription}>
          This category may no longer be available.
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={Styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={18} color={colors.background} />

          <Text style={Styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      {/* =================================================
          HEADER
      ================================================= */}

      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}
        style={Styles.header}
      >
        <View style={Styles.headerContent}>
          {/* BACK */}

          <TouchableOpacity
            activeOpacity={0.7}
            style={Styles.backIconButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* CATEGORY ICON */}

          <View style={Styles.categoryIcon}>
            <MaterialIcons
              name={
                category.icon.replace(
                  /_/g,
                  "-",
                ) as keyof typeof MaterialIcons.glyphMap
              }
              size={25}
              color={colors.primary}
            />
          </View>

          {/* CATEGORY INFO */}

          <View style={Styles.headerInfo}>
            <Text style={Styles.headerTitle} numberOfLines={1}>
              {category.name}
            </Text>

            <Text style={Styles.headerSubtitle}>
              {category.services.length}{" "}
              {category.services.length === 1 ? "service" : "services"}
            </Text>
          </View>
        </View>
      </View>

      {/* =================================================
          SERVICES
      ================================================= */}

      <FlatList
        data={category.services}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          Styles.listContent,
          {
            paddingTop: headerHeight + 12,
          },
        ]}
        ListHeaderComponent={
          <View style={Styles.listHeader}>
            <Text style={Styles.listTitle}>Services in {category.name}</Text>

            <Text style={Styles.listSubtitle}>
              Find a service that fits what you need.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ServiceCard
            service={item}
            onPress={() => {
              router.push({
                pathname: "/service/[id]",
                params: {
                  id: String(item.id),
                },
              });
            }}
          />
        )}
        ListEmptyComponent={
          <View style={Styles.emptyContainer}>
            <View style={Styles.emptyIcon}>
              <Ionicons
                name="briefcase-outline"
                size={30}
                color={colors.primary}
              />
            </View>

            <Text style={Styles.emptyTitle}>No services yet</Text>

            <Text style={Styles.emptyDescription}>
              There are currently no services available in this category.
            </Text>
          </View>
        }
      />
    </View>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  service,
  onPress,
}: {
  service: any;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={Styles.serviceCard}
      onPress={onPress}
    >
      {/* IMAGE */}

      <View style={Styles.imageContainer}>
        <Image
          source={{
            uri: service.image_url || "https://via.placeholder.com/600",
          }}
          style={Styles.serviceImage}
          resizeMode="cover"
        />

        {/* FAVORITE */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.favoriteButton}
          onPress={(event) => {
            event.stopPropagation();
          }}
        >
          <Ionicons name="heart-outline" size={21} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* INFO */}

      <View style={Styles.serviceInfo}>
        <View style={Styles.serviceTopRow}>
          <Text style={Styles.serviceTitle} numberOfLines={1}>
            {service.name}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={19}
            color={colors.textSecondary}
          />
        </View>

        <View style={Styles.categoryRow}>
          <Ionicons
            name="briefcase-outline"
            size={14}
            color={colors.textSecondary}
          />

          <Text style={Styles.categoryText} numberOfLines={1}>
            {service.category_name || "Service"}
          </Text>
        </View>

        <View style={Styles.bottomRow}>
          <Text style={Styles.price}>
            {service.starting_price
              ? `ETB ${service.starting_price}`
              : "Request Quote"}
          </Text>

          {service.price_type === "hourly" && (
            <Text style={Styles.priceUnit}>/ hour</Text>
          )}

          <View style={Styles.location}>
            <Ionicons
              name="location-outline"
              size={15}
              color={colors.primary}
            />

            <Text style={Styles.locationText}>Nearby</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
