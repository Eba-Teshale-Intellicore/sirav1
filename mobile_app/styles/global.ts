import { StyleSheet } from "react-native";

// export const colors = {
//   background: "#000000",
//   header: "#003A26",
//   surface: "#13191B",
//   primary: "#F0AF03",
//   text: "#ffffff",
//   textSecondary: "#a0a0b0",
//   alert: "#ff5252",
// };
export const colors = {
  background: "#FFFFFF",
  header: "#ffffff",
  surface: "#DDDDDD",
  primary: "#F75F50",
  // primary: "#57a900",
  secondary: "#7C83FD",
  text: "#000000",
  textSecondary: "#A9A3C4",
  alert: "#FF4757",
  success: "#4ADE80",
  warning: "#FBBF24",
};
export const typography = {
  fontFamily: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semibold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
    // Amharic strings: pass fontFamily: undefined to fall back to system font
  },

  size: {
    display: 30, // splash / empty states
    h1: 24, // screen titles ("Profile", "Post your Service")
    h2: 20, // section headers ("Browse by Categories")
    h3: 17, // card titles, service names
    bodyLg: 16, // primary readable text
    body: 14, // default UI text, inputs
    caption: 12, // secondary text, timestamps, locations
    micro: 11, // badges, tags, pills
  },

  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  lineHeight: {
    display: 36,
    h1: 30,
    h2: 26,
    h3: 22,
    bodyLg: 22,
    body: 20,
    caption: 16,
    micro: 14,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.header,
    paddingHorizontal: 10,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 10,
    borderBlockColor: colors.surface,
  },

  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    // paddingHorizontal: 5,
  },
  mapicon: {
    color: colors.primary,
  },
  direction: {
    flexDirection: "row",
  },
  place: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },

  location: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },

  notification: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  notificationIcon: {
    color: colors.primary,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    color: colors.textSecondary,
    paddingVertical: 35,
    paddingHorizontal: 10,
    width: "100%",
  },
  searchInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 20,
    marginRight: 20,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surface,
    height: 50,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  filterIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    height: 50,
    width: 50,
    borderRadius: 100,
  },

  filterIcon: {
    color: colors.primary,
  },

  categories: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    width: "100%",
  },

  categoriespace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  categorySubTitle: {
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 10,
  },
  categoriesIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.primary,
  },
  categorysContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingRight: 18,
    paddingLeft: 2,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.header,
    borderWidth: 0.1,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: colors.surface,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    height: 40,
    width: 40,
    borderRadius: 10,
    borderWidth: 0.1,
  },

  filterIcon2: {
    color: colors.text,
  },
  textInput2: {
    color: colors.text,
    fontSize: 16,
  },
  popular: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  serviceCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 15,
  },

  serviceImage: {
    width: "100%",
    height: 200,
  },
  serviceImage2: {
    width: "100%",
    height: 400,
  },

  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 8,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton2: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 8,
  },

  backButton2: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 8,
  },

  serviceInfo: {
    padding: 15,
  },

  serviceTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },

  servicePrice: {
    color: colors.primary,
    fontSize: 16,
    marginTop: 4,
  },

  serviceLocation: {
    color: colors.textSecondary,
    marginLeft: 5,
  },
});
