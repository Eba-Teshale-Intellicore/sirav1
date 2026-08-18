import { StyleSheet } from "react-native";
import { colors, typography } from "./global";

export const serviceStyles = StyleSheet.create({
  // =========================================================
  // CONTAINER
  // =========================================================

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // =========================================================
  // HEADER
  // =========================================================

  header: {
    width: "100%",

    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,

    backgroundColor: colors.header,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButtonCircle: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.surface,
  },

  headerContent: {
    flex: 1,
    marginLeft: 13,
  },

  headerSubtitle: {
    ...typography.caption,

    color: colors.textSecondary,

    marginTop: 3,
  },

  // =========================================================
  // LIST
  // =========================================================

  list: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  // =========================================================
  // SERVICE CARD
  // =========================================================

  card: {
    width: "100%",

    borderRadius: 18,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    overflow: "hidden",
  },

  // =========================================================
  // IMAGE
  // =========================================================

  imageContainer: {
    width: "100%",
    height: 190,

    position: "relative",

    backgroundColor: colors.muted,
  },

  image: {
    width: "100%",
    height: "100%",

    resizeMode: "cover",
  },

  imagePlaceholder: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.primaryLight,
  },

  // =========================================================
  // FAVORITE
  // =========================================================

  favoriteButton: {
    position: "absolute",

    top: 12,
    right: 12,

    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.92)",
  },

  // =========================================================
  // CONTENT
  // =========================================================

  content: {
    padding: 15,

    paddingRight: 45,
  },

  category: {
    ...typography.caption,

    color: colors.primary,

    fontWeight: "600",

    marginBottom: 4,
  },

  title: {
    ...typography.cardTitle,

    color: colors.text,

    lineHeight: 22,
  },

  // =========================================================
  // PRICE
  // =========================================================

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",

    marginTop: 9,
  },

  price: {
    ...typography.price,

    color: colors.primary,
  },

  priceType: {
    ...typography.caption,

    color: colors.textSecondary,

    marginLeft: 4,
  },

  // =========================================================
  // LOCATION
  // =========================================================

  locationRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 9,
  },

  location: {
    ...typography.caption,

    color: colors.textSecondary,

    marginLeft: 4,

    flex: 1,
  },

  // =========================================================
  // ARROW
  // =========================================================

  arrow: {
    position: "absolute",

    right: 15,
    bottom: 20,

    width: 30,
    height: 30,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.background,
  },

  // =========================================================
  // LOADING
  // =========================================================

  loadingContainer: {
    flex: 1,

    backgroundColor: colors.background,

    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    ...typography.body,

    color: colors.textSecondary,

    marginTop: 12,
  },

  // =========================================================
  // ERROR
  // =========================================================

  errorContainer: {
    flex: 1,

    backgroundColor: colors.background,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
  },

  errorIcon: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: colors.primaryLight,

    alignItems: "center",
    justifyContent: "center",
  },

  errorTitle: {
    ...typography.cardTitle,

    color: colors.text,

    marginTop: 14,
  },

  errorText: {
    ...typography.body,

    color: colors.textSecondary,

    textAlign: "center",

    marginTop: 7,

    lineHeight: 21,
  },

  backButton: {
    marginTop: 20,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 18,
    paddingVertical: 11,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: colors.primary,

    backgroundColor: colors.background,
  },

  backButtonText: {
    ...typography.button,

    color: colors.primary,

    marginLeft: 6,
  },

  // =========================================================
  // EMPTY
  // =========================================================

  emptyContainer: {
    alignItems: "center",

    paddingHorizontal: 25,

    paddingTop: 70,
  },

  emptyIcon: {
    width: 68,
    height: 68,

    borderRadius: 34,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.primaryLight,
  },

  emptyTitle: {
    ...typography.cardTitle,

    color: colors.text,

    marginTop: 14,
  },

  emptyText: {
    ...typography.body,

    color: colors.textSecondary,

    textAlign: "center",

    marginTop: 6,

    lineHeight: 21,
  },
});
