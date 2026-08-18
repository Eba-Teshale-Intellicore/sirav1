import { StyleSheet } from "react-native";

// =========================================================
// COLORS
// =========================================================

// export const colors = {
//   background: "#FFFFFF",
//   header: "#FFFFFF",
//   surface: "#F2F2F2",

//   primary: "#57A900",
//   // primary: "#F75F50",

//   secondary: "#7C83FD",

//   text: "#000000",
//   textSecondary: "#777777",

//   alert: "#FF4757",
//   success: "#4ADE80",
//   warning: "#FBBF24",

//   border: "#E5E5E5",
//   muted: "#F8F8F8",
// };
export const colors = {
  background: "#FFFFFF",
  header: "#FFFFFF",

  surface: "#F5F6F4",
  muted: "#FAFAFA",

  primary: "#4F9D00",
  primaryLight: "#EEF7E8",
  // primary: "#F75F50",
  // primaryLight: "#FFF0EE",

  secondary: "#7C83FD",

  text: "#111111",
  textSecondary: "#777777",

  border: "#E6E6E6",

  alert: "#FF4757",
  success: "#4ADE80",
  warning: "#FBBF24",
};
// =========================================================
// TYPOGRAPHY
// =========================================================

export const typography = {
  // =======================================================
  // DISPLAY
  // =======================================================

  display: {
    fontSize: 30,
    fontWeight: "800" as const,
  },

  // =======================================================
  // HEADINGS
  // =======================================================

  pageTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
  },

  cardHeading: {
    fontSize: 20,
    fontWeight: "700" as const,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700" as const,
  },

  title: {
    fontSize: 18,
    fontWeight: "600" as const,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700" as const,
  },

  // =======================================================
  // ACTION / VALUES
  // =======================================================

  price: {
    fontSize: 16,
    fontWeight: "700" as const,
  },

  button: {
    fontSize: 16,
    fontWeight: "700" as const,
  },

  stat: {
    fontSize: 16,
    fontWeight: "700" as const,
  },

  input: {
    fontSize: 16,
    fontWeight: "400" as const,
  },

  // =======================================================
  // BODY
  // =======================================================

  body: {
    fontSize: 15,
    fontWeight: "400" as const,
  },

  bodyMedium: {
    fontSize: 15,
    fontWeight: "500" as const,
  },

  // =======================================================
  // SMALL
  // =======================================================

  subtitle: {
    fontSize: 14,
    fontWeight: "500" as const,
  },

  label: {
    fontSize: 13,
    fontWeight: "500" as const,
  },

  badge: {
    fontSize: 13,
    fontWeight: "600" as const,
  },

  caption: {
    fontSize: 12,
    fontWeight: "400" as const,
  },

  statLabel: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
};

// =========================================================
// GLOBAL STYLES
// =========================================================

export const globalStyles = StyleSheet.create({
  // =======================================================
  // CONTAINER
  // =======================================================

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // =======================================================
  // HEADER
  // =======================================================

  header: {
    width: "100%",
    backgroundColor: colors.header,

    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 4,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  homeHeader: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  direction: {
    flexDirection: "row",
    alignItems: "center",
  },

  // =======================================================
  // LOCATION
  // =======================================================

  mapicon: {
    color: colors.primary,
    marginRight: 8,
  },

  place: {
    ...typography.title,
    color: colors.text,
  },

  location: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // =======================================================
  // NOTIFICATION
  // =======================================================

  notification: {
    width: 44,
    height: 44,

    borderRadius: 22,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.surface,
  },

  notificationIcon: {
    color: colors.primary,
  },

  // =======================================================
  // SEARCH
  // =======================================================

  searchContainer: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    paddingTop: 24,
    paddingBottom: 20,
  },

  searchInput: {
    flex: 1,

    height: 52,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 16,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 14,
  },

  searchIcon: {
    marginRight: 10,
    color: colors.primary,
  },

  textInput: {
    ...typography.input,

    flex: 1,

    color: colors.text,
  },

  filterIconContainer: {
    width: 42,
    height: 42,

    marginLeft: 8,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.background,
  },

  filterIcon: {
    color: colors.primary,
  },

  // =======================================================
  // STICKY SEARCH
  // =======================================================

  stickySearchContainer: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    zIndex: 100,

    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,

    backgroundColor: colors.header,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  stickySearch: {
    paddingVertical: 0,
  },

  stickySearchInput: {
    height: 48,
  },

  // =======================================================
  // CATEGORIES
  // =======================================================

  categories: {
    width: "100%",

    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },

  categoriespace: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,
  },

  categoryTitle: {
    ...typography.sectionTitle,

    color: colors.text,
  },

  categorySubTitle: {
    ...typography.label,

    color: colors.primary,
  },

  categorysContainer: {
    height: 48,

    flexDirection: "row",
    alignItems: "center",

    paddingRight: 16,
    paddingLeft: 5,

    marginRight: 10,

    borderRadius: 14,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,
  },

  activeCategory: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },

  buttonContainer: {
    width: 38,
    height: 38,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 12,

    backgroundColor: colors.surface,
  },

  categoryName: {
    ...typography.bodyMedium,

    color: colors.text,

    marginLeft: 9,
  },

  // =======================================================
  // RECOMMENDATIONS
  // =======================================================

  popular: {
    width: "100%",

    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 4,
  },

  // =======================================================
  // SERVICE CARD
  // =======================================================

  serviceCard: {
    marginHorizontal: 16,
    marginBottom: 18,

    backgroundColor: colors.background,

    borderRadius: 18,
    overflow: "hidden",

    borderWidth: 1,
    borderColor: colors.border,
  },

  serviceImage: {
    width: "100%",
    height: 190,

    backgroundColor: colors.surface,
  },

  serviceImage2: {
    width: "100%",
    height: 400,

    backgroundColor: colors.surface,
  },

  // =======================================================
  // SERVICE ACTIONS
  // =======================================================

  favoriteButton: {
    position: "absolute",

    top: 12,
    right: 12,

    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.background,

    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  backButton: {
    position: "absolute",

    top: 12,
    left: 12,

    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.background,
  },

  favoriteButton2: {
    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.surface,
  },

  backButton2: {
    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.surface,
  },

  // =======================================================
  // SERVICE INFO
  // =======================================================

  serviceInfo: {
    padding: 16,
  },

  serviceTitle: {
    ...typography.cardTitle,

    color: colors.text,
  },

  servicePrice: {
    ...typography.price,

    color: colors.primary,

    marginTop: 7,
  },

  serviceLocation: {
    ...typography.caption,

    color: colors.textSecondary,

    marginLeft: 5,
  },

  serviceLocationRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 8,
  },
});
