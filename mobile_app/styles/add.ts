import { StyleSheet } from "react-native";
import { colors, typography } from "./global";

export const addStyles = StyleSheet.create({
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
    backgroundColor: colors.header,

    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 18,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  head: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    gap: 14,
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.surface,
  },

  backIcon: {
    color: colors.text,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    ...typography.pageTitle,
    color: colors.text,
  },

  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,

    marginTop: 3,
  },

  // =========================================================
  // FORM
  // =========================================================

  form: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  formGroup: {
    width: "100%",
    paddingBottom: 80,
  },

  // =========================================================
  // SECTION
  // =========================================================

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    marginBottom: 12,
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
  },

  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 3,
  },

  // =========================================================
  // FIELD
  // =========================================================

  field: {
    position: "relative",

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 14,

    paddingHorizontal: 16,

    marginBottom: 14,
  },

  fieldFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },

  floatingLabel: {
    position: "absolute",

    top: -9,
    left: 14,

    backgroundColor: colors.background,

    paddingHorizontal: 6,

    zIndex: 10,

    color: colors.primary,

    fontSize: 12,
    fontWeight: "600",
  },

  textInput: {
    ...typography.input,

    color: colors.text,

    height: 52,
  },

  textArea: {
    ...typography.input,

    color: colors.text,

    minHeight: 120,

    paddingTop: 14,
    paddingBottom: 14,
  },

  // =========================================================
  // PICKER
  // =========================================================

  pickerContainer: {
    height: 52,

    justifyContent: "center",
  },

  picker: {
    color: colors.text,

    width: "100%",
  },

  // =========================================================
  // IMAGE
  // =========================================================

  imageField: {
    height: 190,

    borderRadius: 16,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    justifyContent: "center",
    alignItems: "center",

    overflow: "hidden",
  },

  imageFieldActive: {
    borderColor: colors.primary,
  },

  imageIconContainer: {
    width: 58,
    height: 58,

    borderRadius: 29,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.primaryLight,
  },

  imageTitle: {
    ...typography.cardTitle,

    color: colors.text,

    marginTop: 12,
  },

  imageSubtitle: {
    ...typography.caption,

    color: colors.textSecondary,

    marginTop: 5,
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },

  // =========================================================
  // PRICE
  // =========================================================

  priceRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },

  priceField: {
    flex: 1,
    marginBottom: 0,
  },

  currency: {
    ...typography.bodyMedium,

    color: colors.textSecondary,
  },

  // =========================================================
  // PUBLISH BUTTON
  // =========================================================

  postButton: {
    height: 56,

    borderRadius: 15,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 8,
  },

  postButtonText: {
    ...typography.button,

    color: colors.background,
  },

  // =========================================================
  // HELPER
  // =========================================================

  helperText: {
    ...typography.caption,

    color: colors.textSecondary,

    marginTop: 6,
    marginLeft: 3,
  },
});
