import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { colors, typography } from "@/styles/global";
import { profileStyles } from "@/styles/profile";
import { useAuth } from "@/context/AuthContext";
import { useMyProviderProfile } from "@/hooks/useProviderProfile";

export default function ProfilePage() {
  const router = useRouter();

  const { user, isAuthenticated } = useAuth();

  const isProvider = user?.role === "provider";

  const {
    data: provider,
    isLoading: providerLoading,
    isFetching: providerFetching,
  } = useMyProviderProfile({
    enabled: isAuthenticated && isProvider,
  });
  if (!isAuthenticated) {
    return null;
  }

  if (providerLoading && isProvider) {
    return (
      <View style={profileStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={profileStyles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  const avatar = provider?.profile_image || user?.avatar;

  const handleEditProfile = () => {
    router.push(isProvider ? "/provider/edit" : "/profile/edit");
  };

  return (
    <ScrollView
      style={profileStyles.container}
      contentContainerStyle={profileStyles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <View style={profileStyles.header}>
        <Text
          style={[
            typography.pageTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Your Profile
        </Text>

        {/* KEEP HEADER EDIT */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleEditProfile}
          style={profileStyles.headerEditButton}
        >
          <Ionicons name="create-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* =====================================================
          IDENTITY
      ===================================================== */}

      <View style={profileStyles.identityCard}>
        <View style={profileStyles.identityRow}>
          {/* AVATAR */}

          {avatar ? (
            <Image source={{ uri: avatar }} style={profileStyles.avatar} />
          ) : (
            <View style={profileStyles.avatarPlaceholder}>
              <Ionicons name="person" size={42} color={colors.background} />
            </View>
          )}

          {/* USER INFORMATION */}

          <View style={profileStyles.identityInfo}>
            <Text
              style={[
                typography.cardTitle,
                {
                  color: colors.text,
                },
              ]}
              numberOfLines={1}
            >
              {user?.full_name || "Your Name"}
            </Text>

            <Text
              style={[
                typography.body,
                {
                  color: colors.textSecondary,
                  marginTop: 4,
                },
              ]}
              numberOfLines={1}
            >
              {user?.email || "No email"}
            </Text>

            <View style={profileStyles.badgeRow}>
              {/* ROLE */}

              <View style={profileStyles.roleBadge}>
                <Text style={profileStyles.roleBadgeText}>
                  {user?.role || "customer"}
                </Text>
              </View>

              {/* VERIFIED */}

              {isProvider && provider?.is_verified && (
                <View style={profileStyles.verifiedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={15}
                    color={colors.primary}
                  />

                  <Text style={profileStyles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* =================================================
            EDIT PROFILE BUTTON
            KEEP THIS TOO
        ================================================= */}

        <TouchableOpacity
          style={profileStyles.identityEditButton}
          activeOpacity={0.8}
          onPress={handleEditProfile}
        >
          <Ionicons name="create-outline" size={18} color={colors.primary} />

          <Text style={profileStyles.identityEditText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* =====================================================
          PROVIDER
      ===================================================== */}

      {isProvider ? (
        <>
          {/* =================================================
              REPUTATION
          ================================================= */}

          <SectionHeader
            title="Your Reputation"
            subtitle="How customers see your service"
          />

          <View style={profileStyles.reputationCard}>
            <Stat
              icon="star"
              value={Number(provider?.average_rating ?? 0).toFixed(1)}
              label="Rating"
            />

            <View style={profileStyles.statDivider} />

            <Stat
              icon="checkmark-done"
              value={provider?.completed_jobs ?? 0}
              label="Jobs"
            />

            <View style={profileStyles.statDivider} />

            <Stat
              icon={
                provider?.is_available ? "radio-button-on" : "radio-button-off"
              }
              value={provider?.is_available ? "Available" : "Offline"}
              label="Status"
            />
          </View>

          {/* =================================================
              ABOUT
          ================================================= */}

          <SectionHeader
            title="About You"
            subtitle="Help customers understand your experience"
          />

          <InfoCard
            icon="document-text-outline"
            title="Bio"
            value={
              provider?.bio ||
              "Add a short description about yourself and the services you provide."
            }
          />

          <InfoCard
            icon="briefcase-outline"
            title="Experience"
            value={`${provider?.experience_years ?? 0} years`}
          />

          <InfoCard
            icon="language-outline"
            title="Languages"
            value={provider?.languages || "No languages added yet"}
          />

          {/* =================================================
              CONTACT
          ================================================= */}

          <SectionHeader
            title="Contact Information"
            subtitle="Information customers can use to reach you"
          />

          <InfoCard
            icon="call-outline"
            title="Phone"
            value={provider?.phone || "No phone number added"}
          />

          <InfoCard
            icon="location-outline"
            title="City"
            value={provider?.city || "No city added"}
          />

          <InfoCard
            icon="home-outline"
            title="Address"
            value={provider?.address || "No address added"}
          />

          {/* =================================================
              SERVICES
          ================================================= */}

          <SectionHeader
            title="My Services"
            subtitle="Services you're currently offering"
          />

          <View style={profileStyles.servicesContainer}>
            {provider?.services?.length ? (
              provider.services.map((service: any) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onPress={() =>
                    router.push({
                      pathname: "/service/[id]",
                      params: {
                        id: String(service.id),
                      },
                    })
                  }
                />
              ))
            ) : (
              <EmptyServices onPress={() => router.push("/add")} />
            )}
          </View>

          {/* =================================================
              PROVIDER EDIT CTA
          ================================================= */}

          <TouchableOpacity
            style={profileStyles.bottomEditButton}
            activeOpacity={0.85}
            onPress={handleEditProfile}
          >
            <Ionicons name="create-outline" size={19} color={colors.primary} />

            <Text style={profileStyles.bottomEditText}>
              Edit Provider Profile
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        /* =====================================================
           CUSTOMER
        ===================================================== */

        <>
          <View style={profileStyles.customerCard}>
            <View style={profileStyles.customerIcon}>
              <Ionicons
                name="briefcase-outline"
                size={28}
                color={colors.primary}
              />
            </View>

            <Text
              style={[
                typography.sectionTitle,
                {
                  color: colors.text,
                  marginTop: 14,
                },
              ]}
            >
              Become a Provider
            </Text>

            <Text style={profileStyles.customerDescription}>
              Offer your skills and connect with customers who need your
              services.
            </Text>

            <TouchableOpacity
              style={profileStyles.primaryButton}
              activeOpacity={0.85}
              onPress={() => router.push("/provider/become")}
            >
              <Text style={profileStyles.primaryButtonText}>
                Become a Provider
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color={colors.background}
              />
            </TouchableOpacity>
          </View>

          {/* CUSTOMER EDIT */}

          <TouchableOpacity
            style={profileStyles.bottomEditButton}
            activeOpacity={0.85}
            onPress={handleEditProfile}
          >
            <Ionicons name="create-outline" size={19} color={colors.primary} />

            <Text style={profileStyles.bottomEditText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={profileStyles.sectionHeader}>
      <Text
        style={[
          typography.sectionTitle,
          {
            color: colors.text,
          },
        ]}
      >
        {title}
      </Text>

      <Text style={profileStyles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View style={profileStyles.infoCard}>
      <View style={profileStyles.infoIcon}>
        <Ionicons name={icon} size={21} color={colors.primary} />
      </View>

      <View style={profileStyles.infoContent}>
        <Text style={profileStyles.infoTitle}>{title}</Text>

        <Text style={profileStyles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({
  icon,
  value,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string | number;
  label: string;
}) {
  return (
    <View style={profileStyles.stat}>
      <Ionicons name={icon} size={20} color={colors.primary} />

      <Text style={profileStyles.statValue}>{value}</Text>

      <Text style={profileStyles.statLabel}>{label}</Text>
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
  const isHourly = service.price_type === "hourly";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={profileStyles.serviceCard}
      onPress={onPress}
    >
      {/* SERVICE ICON */}

      <View style={profileStyles.serviceIcon}>
        <Ionicons name="briefcase-outline" size={23} color={colors.primary} />
      </View>

      {/* CONTENT */}

      <View style={profileStyles.serviceContent}>
        <Text style={profileStyles.serviceTitle} numberOfLines={1}>
          {service.name}
        </Text>

        <Text style={profileStyles.serviceCategory} numberOfLines={1}>
          {service.category_name || "Service"}
        </Text>

        <Text style={profileStyles.servicePrice}>
          {service.starting_price
            ? `ETB ${service.starting_price}`
            : "Request Quote"}

          {isHourly ? " / hour" : ""}
        </Text>
      </View>

      {/* ARROW */}

      <View style={profileStyles.serviceArrow}>
        <Ionicons
          name="chevron-forward"
          size={19}
          color={colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );
}

/* =========================================================
   EMPTY SERVICES
========================================================= */

function EmptyServices({ onPress }: { onPress: () => void }) {
  return (
    <View style={profileStyles.emptyServices}>
      <View style={profileStyles.emptyIcon}>
        <Ionicons name="briefcase-outline" size={28} color={colors.primary} />
      </View>

      <Text style={profileStyles.emptyTitle}>No services yet</Text>

      <Text style={profileStyles.emptyDescription}>
        Add your first service and start connecting with customers.
      </Text>

      <TouchableOpacity
        style={profileStyles.secondaryButton}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Ionicons name="add" size={19} color={colors.primary} />

        <Text style={profileStyles.secondaryButtonText}>Add Service</Text>
      </TouchableOpacity>
    </View>
  );
}
