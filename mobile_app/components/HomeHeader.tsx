import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { colors, globalStyles } from "@/styles/global";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoriy";
import { getServices } from "@/services/service";

interface Service {
  id: string;
  category: string;
  category_name: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price_type: string;
  starting_price: string;
  duration: number;
  is_active: boolean;
  created_at: string;
}
interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  services: Service[];
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],

    queryFn: getCategories,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],

    queryFn: getServices,
  });
}

export const HomeHeader = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data: categories = [] } = useCategories();

  const {
    data: services = [],
    isLoading,
    error,
  } = useServices() as {
    data: Service[];
    isLoading: boolean;
    error: unknown;
  };

  useEffect(() => {
    if (categories.length > 0 && activeCategory === null) {
      setActiveCategory(categories[0].id);
    }
  }, []);

  const filteredServices =
    activeCategory === null
      ? services
      : services.filter((service) => service.category_name === activeCategory);

  if (isLoading) {
    return <Text style={{ color: "white" }}>Loading services...</Text>;
  }
  // Later you'll replace this with skeleton cards.
  if (error) {
    return <Text style={{ color: "red" }}>Failed to load services.</Text>;
  }

  return (
    <View>
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

              <Text style={globalStyles.place}>Addis Ababa, Ethiopia</Text>
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
      </View>
      <View style={globalStyles.categories}>
        <View style={globalStyles.categoriespace}>
          <Text style={globalStyles.categoryTitle}>Service Categories</Text>
          <TouchableOpacity>
            <Text style={globalStyles.categorySubTitle}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.category}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                // onPress={() => setActiveCategory(item.name)}
                onPress={() => setActiveCategory(item.id)}
                style={[
                  globalStyles.categorysContainer,
                  activeCategory === item.name && globalStyles.activeCategory,
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
      </View>
      <View style={globalStyles.popular}>
        <View style={globalStyles.categoriespace}>
          <Text style={globalStyles.categoryTitle}>Popular Services</Text>
          <TouchableOpacity>
            <Text style={globalStyles.categorySubTitle}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={globalStyles.serviceCard} key={item.id}>
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

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="location-outline"
                    size={16}
                    color={colors.primary}
                  />

                  {/* <Text style={globalStyles.serviceLocation}>
                  {service.location}
                </Text> */}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};
