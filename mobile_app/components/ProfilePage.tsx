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

import { colors, globalStyles } from "@/styles/global";
import { useAuth } from "@/context/AuthContext";
import { useMyProviderProfile } from "@/hooks/useProviderProfile";

export default function ProfilePage() {
  const router = useRouter();

  const { user, isAuthenticated } = useAuth();

  const isProvider = user?.role === "provider";

  const { data: provider, isLoading: providerLoading } = useMyProviderProfile({
    enabled: isProvider,
  });

  if (!isAuthenticated) {
    return null;
  }

  if (providerLoading && isProvider) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const avatar = provider?.profile_image || user?.avatar;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View
        style={{
          width: "100%",
          paddingHorizontal: 10,
          paddingTop: 60,
          paddingBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomWidth: 10,
          borderBlockColor: colors.surface,
          backgroundColor: colors.header,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 24,
            fontWeight: "700",
          }}
        >
          Your Profile
        </Text>

        <TouchableOpacity
          onPress={() =>
            router.push(isProvider ? "/provider/edit" : "/profile/edit")
          }
        >
          <Ionicons name="create-outline" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* IDENTITY */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          padding: 20,
          gap: 20,
        }}
      >
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 90,
              marginTop: 20,
            }}
          />
        ) : (
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 90,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="person" size={55} color={colors.header} />
          </View>
        )}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: colors.text,
                fontSize: 24,
                fontWeight: "700",
                marginTop: 15,
              }}
            >
              {user?.full_name}
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                marginTop: 5,
              }}
            >
              {user?.email}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: colors.primary,
              marginRight: 70,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {user?.role}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/profile/edit")}>
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: colors.primary,
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
              <Ionicons name="create-outline" size={18} color={colors.text} />
              Edit
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* PROVIDER */}

      {isProvider ? (
        <>
          <SectionTitle title="Provider Status" />

          <View
            style={{
              marginHorizontal: 20,
              padding: 18,
              borderRadius: 18,
              backgroundColor: colors.surface,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={colors.primary}
              />

              <Text
                style={{
                  color: colors.text,
                  fontSize: 17,
                  fontWeight: "700",
                  marginLeft: 8,
                }}
              >
                Provider
              </Text>

              {provider?.is_verified && (
                <Text
                  style={{
                    color: colors.primary,
                    marginLeft: 8,
                  }}
                >
                  Verified
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Stat
                icon="star"
                value={provider?.average_rating ?? "0.00"}
                label="Rating"
              />

              <Stat
                icon="checkmark-done"
                value={provider?.completed_jobs ?? 0}
                label="Jobs"
              />

              <Stat
                icon="ellipse"
                value={provider?.is_available ? "Available" : "Offline"}
                label="Status"
              />
            </View>
          </View>

          {/* ABOUT */}

          <SectionTitle title="About" />

          <InfoCard
            icon="document-text-outline"
            title="Bio"
            value={
              provider?.bio || "Add a short description about your experience."
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
            value={provider?.languages || "No languages added"}
          />

          {/* CONTACT */}

          <SectionTitle title="Contact" />

          <InfoCard
            icon="call-outline"
            title="Phone"
            value={provider?.phone || "No phone number"}
          />

          <InfoCard
            icon="location-outline"
            title="City"
            value={provider?.city || "No city"}
          />

          <InfoCard
            icon="home-outline"
            title="Address"
            value={provider?.address || "No address"}
          />

          {/* SERVICES */}

          <SectionTitle title="My Services" />

          <View style={{ marginHorizontal: 20 }}>
            {provider?.services?.length ? (
              provider.services.map((service: any) => (
                <TouchableOpacity
                  key={service.id}
                  style={{
                    padding: 16,
                    marginBottom: 12,
                    borderRadius: 18,
                    backgroundColor: colors.surface,
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/service/[id]",
                      params: {
                        id: service.id,
                      },
                    })
                  }
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 17,
                      fontWeight: "700",
                    }}
                  >
                    {service.name}
                  </Text>

                  <Text
                    style={{
                      color: colors.textSecondary,
                      marginTop: 5,
                    }}
                  >
                    {service.category_name}
                  </Text>

                  <Text
                    style={{
                      color: colors.primary,
                      fontWeight: "700",
                      marginTop: 8,
                    }}
                  >
                    {service.starting_price
                      ? `ETB ${service.starting_price}`
                      : "Request Quote"}
                    {service.price_type === "hourly" ? " / hour" : ""}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  color: colors.textSecondary,
                }}
              >
                {/* You haven't added any services yet. */}
              </Text>
            )}
          </View>
        </>
      ) : (
        /* CUSTOMER */

        <View
          style={{
            margin: 20,
            padding: 20,
            borderRadius: 20,
            backgroundColor: colors.surface,
          }}
        >
          <Ionicons name="briefcase-outline" size={30} color={colors.primary} />

          <Text
            style={{
              color: colors.text,
              fontSize: 20,
              fontWeight: "700",
              marginTop: 12,
            }}
          >
            Become a Provider
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: 8,
              lineHeight: 20,
            }}
          >
            Offer your skills and earn from local customers.
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 18,
              padding: 15,
              borderRadius: 14,
              backgroundColor: colors.primary,
              alignItems: "center",
            }}
            onPress={() => router.push("/provider/become")}
          >
            <Text
              style={{
                color: colors.background,
                fontWeight: "700",
              }}
            >
              Become a Provider
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* EDIT */}

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          padding: 16,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: colors.primary,
          alignItems: "center",
        }}
        // onPress={() => router.push("/profile/edit")}
        onPress={() =>
          router.push(isProvider ? "/provider/edit" : "/profile/edit")
        }
      >
        <Text
          style={{
            color: colors.primary,
            fontWeight: "700",
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        color: colors.text,
        fontSize: 19,
        fontWeight: "700",
        marginHorizontal: 20,
        marginTop: 28,
        marginBottom: 12,
      }}
    >
      {title}
    </Text>
  );
}

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
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 16,
        borderRadius: 15,
        backgroundColor: colors.surface,
        flexDirection: "row",
      }}
    >
      <Ionicons name={icon} size={22} color={colors.primary} />

      <View style={{ marginLeft: 14, flex: 1 }}>
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 4,
            fontSize: 15,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

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
    <View style={{ alignItems: "center" }}>
      <Ionicons name={icon} size={20} color={colors.primary} />

      <Text
        style={{
          color: colors.text,
          fontWeight: "700",
          marginTop: 5,
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 12,
          marginTop: 3,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
