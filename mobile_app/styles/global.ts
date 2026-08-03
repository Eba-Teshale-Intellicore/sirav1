import { StyleSheet } from "react-native";

export const colors = {
  background: "#000000",
  header: "#003A26",
  surface: "#13191B",
  primary: "#F0AF03",
  text: "#ffffff",
  textSecondary: "#a0a0b0",
  alert: "#ff5252",
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
    paddingTop: 80,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  location: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  direction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mapicon: {
    color: colors.primary,
  },
  place: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
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
    paddingHorizontal: 20,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 50,
    borderRadius: 80,
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
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 100,
  },

  filterIcon: {
    color: colors.header,
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
    color: colors.primary,
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
    borderRadius: 30,
    backgroundColor: colors.surface,
    marginRight: 10,
  },

  activeCategory: {
    backgroundColor: colors.header,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    height: 40,
    width: 40,
    borderRadius: 50,
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
    height: 180,
  },

  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
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
