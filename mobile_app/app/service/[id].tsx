import { useServices } from "@/hooks/useCategories";
import { colors, globalStyles, typography } from "@/styles/global";
import { Styles } from "@/styles/services";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const tabs = ["About", "Gallery", "Reviews"] as const;

export default function ServiceDetailPage() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: services = [], isLoading } = useServices();

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("About");

  const service = services.find((item) => String(item.id) === String(id));

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <View style={Styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={Styles.loadingText}>Loading service...</Text>
      </View>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */

  if (!service) {
    return (
      <View style={Styles.notFoundContainer}>
        <View style={Styles.notFoundIcon}>
          <Ionicons name="search-outline" size={32} color={colors.primary} />
        </View>

        <Text style={Styles.notFoundTitle}>Service Not Found</Text>

        <Text style={Styles.notFoundText}>
          This service may have been removed or is no longer available.
        </Text>

        <TouchableOpacity
          style={Styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={Styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const price = service.starting_price
    ? `ETB ${service.starting_price}`
    : "Request Quote";

  return (
    <View style={Styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styles.scrollContent}
      >
        {/* =====================================================
            HERO IMAGE
        ===================================================== */}

        <View style={Styles.heroContainer}>
          <Image
            source={{
              uri: service.image_url || "https://via.placeholder.com/800",
            }}
            style={Styles.heroImage}
            resizeMode="cover"
          />

          {/* IMAGE OVERLAY */}

          <View style={Styles.imageOverlay} />

          {/* TOP ACTIONS */}

          <View style={Styles.topActions}>
            {/* BACK */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.circleButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={23} color={colors.text} />
            </TouchableOpacity>

            <View style={Styles.rightActions}>
              {/* FAVORITE */}

              <TouchableOpacity activeOpacity={0.8} style={Styles.circleButton}>
                <Ionicons name="heart-outline" size={22} color={colors.text} />
              </TouchableOpacity>

              {/* SHARE */}

              <TouchableOpacity activeOpacity={0.8} style={Styles.circleButton}>
                <Ionicons name="share-outline" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* =====================================================
            SERVICE INFORMATION
        ===================================================== */}

        <View style={Styles.serviceInfo}>
          {/* CATEGORY */}

          <Text style={Styles.category}>
            {service.category_name || "Home Service"}
          </Text>

          {/* TITLE */}

          <Text style={Styles.serviceTitle}>{service.name}</Text>

          {/* RATING */}

          <View style={Styles.ratingRow}>
            <Ionicons name="star" size={18} color={colors.primary} />

            <Text style={Styles.rating}>4.8</Text>

            <Text style={Styles.reviewCount}>• 24 reviews</Text>
          </View>

          {/* LOCATION */}

          <View style={Styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.primary}
            />

            <Text style={Styles.locationText}>Available in your area</Text>
          </View>

          {/* PRICE */}

          <View style={Styles.priceCard}>
            <View>
              <Text style={Styles.priceLabel}>Starting price</Text>

              <Text style={Styles.price}>{price}</Text>
            </View>

            {service.price_type === "hourly" && (
              <Text style={Styles.priceUnit}>/ hour</Text>
            )}
          </View>

          {/* =================================================
              TABS
          ================================================= */}

          <View style={Styles.tabs}>
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  activeOpacity={0.7}
                  onPress={() => setActiveTab(tab)}
                  style={[Styles.tab, active && Styles.activeTab]}
                >
                  <Text
                    style={[Styles.tabText, active && Styles.activeTabText]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* =================================================
              ABOUT
          ================================================= */}

          {activeTab === "About" && (
            <View style={Styles.tabContent}>
              <Text style={Styles.tabTitle}>About this service</Text>

              <Text style={Styles.description}>
                {service.description ||
                  "No description available for this service."}
              </Text>

              {/* FEATURES */}

              <View style={Styles.features}>
                <Feature
                  icon="checkmark-circle-outline"
                  title="Professional service"
                  description="Quality service from local providers"
                />

                <Feature
                  icon="shield-checkmark-outline"
                  title="Trusted providers"
                  description="Connect with verified service providers"
                />

                <Feature
                  icon="time-outline"
                  title="Flexible booking"
                  description="Choose a time that works for you"
                />
              </View>
            </View>
          )}

          {/* =================================================
              GALLERY
          ================================================= */}

          {activeTab === "Gallery" && (
            <View style={Styles.tabContent}>
              <Text style={Styles.tabTitle}>Service Gallery</Text>

              <View style={Styles.galleryGrid}>
                <Image
                  source={{ uri: service.image_url }}
                  style={Styles.galleryImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          )}

          {/* =================================================
              REVIEWS
          ================================================= */}

          {activeTab === "Reviews" && (
            <View style={Styles.tabContent}>
              <View style={Styles.reviewSummary}>
                <Text style={Styles.reviewScore}>4.8</Text>

                <View>
                  <View style={Styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name="star"
                        size={17}
                        color={colors.primary}
                      />
                    ))}
                  </View>

                  <Text style={Styles.reviewText}>Based on 24 reviews</Text>
                </View>
              </View>

              <Text style={Styles.emptyReview}>
                Customer reviews will appear here.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* =====================================================
          BOOKING BAR
      ===================================================== */}

      <View style={Styles.bookingBar}>
        <View>
          <Text style={Styles.bookingLabel}>Starting from</Text>

          <Text style={Styles.bookingPrice}>{price}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={Styles.bookingButton}
          onPress={() => {
            // router.push({
            //   pathname: "/booking/[id]",
            //   params: {
            //     id: String(service.id),
            //   },
            // });
          }}
        >
          <Text style={Styles.bookingButtonText}>Request Service</Text>

          <Ionicons name="arrow-forward" size={19} color={colors.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =========================================================
   FEATURE
========================================================= */

function Feature({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <View style={Styles.feature}>
      <View style={Styles.featureIcon}>
        <Ionicons name={icon} size={21} color={colors.primary} />
      </View>

      <View style={Styles.featureContent}>
        <Text style={Styles.featureTitle}>{title}</Text>

        <Text style={Styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}
