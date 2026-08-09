import { useServices } from "@/hooks/useCategories";
import { addStyles } from "@/styles/add";
import { colors, globalStyles } from "@/styles/global";
import { Styles } from "@/styles/services";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const header = ["About", "Gallery", "Review"] as const;

export default function ServiceDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: services = [] } = useServices();

  const [activeTab, setActiveTab] = useState<(typeof header)[number]>("About");

  const service = services.find((item) => item.id.toString() === id);

  if (!service) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
          }}
        >
          Service Not Found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Service Image */}
        <View>
          <Image
            source={{ uri: service.image_url }}
            style={globalStyles.serviceImage2}
          />

          <View
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              right: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Back */}
            <TouchableOpacity style={globalStyles.backButton2}>
              <Ionicons name="arrow-back" size={26} color={colors.text} />
            </TouchableOpacity>

            {/* Right buttons */}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              {/* Favorite */}
              <TouchableOpacity style={globalStyles.favoriteButton2}>
                <Ionicons name="heart-outline" size={22} color={colors.text} />
              </TouchableOpacity>

              {/* Share */}
              <TouchableOpacity style={globalStyles.favoriteButton2}>
                <Ionicons name="share-outline" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Service Information */}
        <View style={Styles.serviceinfo}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 24,
                fontWeight: "700",
              }}
            >
              {service.name}
            </Text>

            <Ionicons
              name="location-outline"
              size={24}
              color={colors.primary}
              style={Styles.locationicon}
            />
          </View>

          {/* Tabs */}
          <View style={Styles.tabs}>
            {header.map((item) => {
              const active = activeTab === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setActiveTab(item)}
                  style={[
                    Styles.tab,
                    {
                      borderBottomWidth: active ? 2 : 0,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active ? colors.primary : colors.textSecondary,
                      fontWeight: active ? "700" : "500",
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tab Content */}
          <View style={Styles.tabcon}>
            {activeTab === "About" && (
              <View>
                <Text style={Styles.tabtitle}>About this service</Text>

                <Text style={Styles.desc}>
                  {service.description ||
                    "No description available for this service."}
                </Text>
              </View>
            )}

            {activeTab === "Gallery" && (
              <View>
                <Text style={Styles.tabtitle}>Gallery</Text>

                <Image
                  source={{ uri: service.image_url }}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                />
              </View>
            )}

            {activeTab === "Review" && (
              <View>
                <Text style={Styles.tabtitle}>Reviews</Text>

                <Text style={Styles.desc}>No reviews yet.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
