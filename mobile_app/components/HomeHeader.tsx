import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { colors, globalStyles } from "@/styles/global";
import { getServices } from "@/services/service";
import { getCategories } from "@/services/categoriy";
interface Service {
  id: string;
  category: string;
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

export const HomeHeader = () => {
  const [activeCategory, setActiveCategory] = useState("Cleaning");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    loadCategories();
  }, []);

  // const categories = [
  //   {
  //     name: "Cleaning",
  //     icon: "sparkles-outline",
  //   },
  //   {
  //     name: "Repairing",
  //     icon: "construct-outline",
  //   },
  //   {
  //     name: "Plumbing",
  //     icon: "water-outline",
  //   },
  //   {
  //     name: "Electrical",
  //     icon: "flash-outline",
  //   },
  //   {
  //     name: "Moving",
  //     icon: "car-outline",
  //   },
  // ];
  const popularServices = [
    {
      id: 1,
      title: "Home Cleaning",
      price: "ETB 500",
      location: "Bole",
      image: "https://example.com/cleaning.jpg",
    },
    {
      id: 2,
      title: "Deep Cleaning",
      price: "ETB 700",
      location: "Addis Ababa, Bole",
      image: "https://example.com/cleaning.jpg",
    },
  ];

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    load();
  }, []);
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
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.name)}
              style={[
                globalStyles.categorysContainer,
                activeCategory === category.name && globalStyles.activeCategory,
              ]}
            >
              {/* <View style={globalStyles.buttonContainer}>
                <Ionicons
                  name={category.icon}
                  size={22}
                  style={globalStyles.filterIcon2}
                />
              </View> */}
              <View style={globalStyles.buttonContainer}>
                <Image
                  source={{ uri: category.icon }}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                  }}
                />
              </View>

              <Text style={globalStyles.textInput2}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={globalStyles.popular}>
        <View style={globalStyles.categoriespace}>
          <Text style={globalStyles.categoryTitle}>Popular Services</Text>
          <TouchableOpacity>
            <Text style={globalStyles.categorySubTitle}>See All</Text>
          </TouchableOpacity>
        </View>
        {services.map((service, index) => (
          <View style={globalStyles.serviceCard} key={service.id}>
            <Image
              source={{ uri: service.image }}
              style={globalStyles.serviceImage}
            />

            <TouchableOpacity style={globalStyles.favoriteButton}>
              <Ionicons name="heart-outline" size={22} color={colors.text} />
            </TouchableOpacity>

            <View style={globalStyles.serviceInfo}>
              <Text style={globalStyles.serviceTitle}>{service.name}</Text>

              <Text style={globalStyles.servicePrice}>
                ETB {service.starting_price}
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
        ))}
      </View>
    </View>
  );
};
