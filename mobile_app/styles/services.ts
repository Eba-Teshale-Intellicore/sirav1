import { StyleSheet } from "react-native";
import { colors, typography } from "./global";

export const Styles = StyleSheet.create({
  /* =====================================================
     CONTAINER
  ===================================================== */

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    paddingBottom: 110,
  },

  /* =====================================================
     LOADING
  ===================================================== */

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

  /* =====================================================
     NOT FOUND
  ===================================================== */

  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  notFoundIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundTitle: {
    ...typography.cardHeading,
    color: colors.text,
    marginTop: 18,
  },

  notFoundText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
  },

  backButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },

  backButtonText: {
    ...typography.button,
    color: colors.background,
  },

  /* =====================================================
     HERO
  ===================================================== */

  heroContainer: {
    width: "100%",
    height: 320,
    position: "relative",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  topActions: {
    position: "absolute",
    top: 55,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightActions: {
    flexDirection: "row",
    gap: 10,
  },

  circleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* =====================================================
     SERVICE INFO
  ===================================================== */

  serviceInfo: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  category: {
    ...typography.label,
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  serviceTitle: {
    ...typography.display,
    color: colors.text,
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  rating: {
    ...typography.bodyMedium,
    color: colors.text,
    marginLeft: 5,
  },

  reviewCount: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: 5,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  locationText: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: 5,
  },

  /* =====================================================
     PRICE
  ===================================================== */

  priceCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  priceLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  price: {
    ...typography.price,
    color: colors.primary,
    marginTop: 3,
  },

  priceUnit: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 3,
  },

  /* =====================================================
     TABS
  ===================================================== */

  tabs: {
    flexDirection: "row",
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  activeTab: {
    borderBottomColor: colors.primary,
  },

  tabText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },

  activeTabText: {
    color: colors.primary,
    fontWeight: "700",
  },

  /* =====================================================
     TAB CONTENT
  ===================================================== */

  tabContent: {
    paddingTop: 22,
  },

  tabTitle: {
    ...typography.cardHeading,
    color: colors.text,
    marginBottom: 10,
  },

  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 23,
  },

  /* =====================================================
     FEATURES
  ===================================================== */

  features: {
    marginTop: 24,
    gap: 12,
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",
  },

  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },

  featureContent: {
    flex: 1,
    marginLeft: 12,
  },

  featureTitle: {
    ...typography.bodyMedium,
    color: colors.text,
  },

  featureDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  /* =====================================================
     GALLERY
  ===================================================== */

  galleryGrid: {
    marginTop: 4,
  },

  galleryImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },

  /* =====================================================
     REVIEWS
  ===================================================== */

  reviewSummary: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },

  reviewScore: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.text,
    marginRight: 18,
  },

  stars: {
    flexDirection: "row",
    gap: 3,
  },

  reviewText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 5,
  },

  emptyReview: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 24,
  },

  /* =====================================================
     FEATURE / BOOKING BAR
  ===================================================== */

  bookingBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,

    backgroundColor: colors.background,

    borderTopWidth: 1,
    borderTopColor: colors.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  bookingLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  bookingPrice: {
    ...typography.price,
    color: colors.text,
    marginTop: 2,
  },

  bookingButton: {
    height: 50,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: colors.primary,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  bookingButtonText: {
    ...typography.button,
    color: colors.background,
    marginRight: 7,
  },
});
