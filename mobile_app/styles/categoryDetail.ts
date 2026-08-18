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

  notFoundDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 7,
  },

  backButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 13,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
  },

  backButtonText: {
    ...typography.button,
    color: colors.background,
    marginLeft: 7,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,

    zIndex: 10,
    elevation: 10,

    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 16,

    backgroundColor: colors.header,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  backIconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.surface,
  },

  categoryIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,

    marginLeft: 12,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.primaryLight,
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    ...typography.cardTitle,
    color: colors.text,
  },

  headerSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },

  /* =====================================================
     LIST
  ===================================================== */

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 35,
  },

  listHeader: {
    marginBottom: 14,
  },

  listTitle: {
    ...typography.sectionTitle,
    color: colors.text,
  },

  listSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 4,
  },

  /* =====================================================
     SERVICE CARD
  ===================================================== */

  serviceCard: {
    marginBottom: 14,

    borderRadius: 18,

    backgroundColor: colors.surface,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: colors.border,
  },

  imageContainer: {
    width: "100%",
    height: 190,
    position: "relative",
  },

  serviceImage: {
    width: "100%",
    height: "100%",
  },

  favoriteButton: {
    position: "absolute",

    top: 12,
    right: 12,

    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.94)",
  },

  /* =====================================================
     SERVICE INFO
  ===================================================== */

  serviceInfo: {
    padding: 15,
  },

  serviceTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  serviceTitle: {
    ...typography.cardTitle,
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  categoryText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: 5,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  price: {
    ...typography.price,
    color: colors.primary,
  },

  priceUnit: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: 3,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },

  locationText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: 3,
  },

  /* =====================================================
     EMPTY
  ===================================================== */

  emptyContainer: {
    marginTop: 30,

    padding: 25,

    borderRadius: 18,

    alignItems: "center",

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: colors.primaryLight,
  },

  emptyTitle: {
    ...typography.cardTitle,
    color: colors.text,
    marginTop: 12,
  },

  emptyDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 6,
  },
});
