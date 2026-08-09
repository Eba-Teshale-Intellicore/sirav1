import { StyleSheet } from "react-native";
import { colors } from "./global";

export const addStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.header,
    paddingHorizontal: 10,
    paddingTop: 80,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  head: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    gap: 18,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  backIcon: {
    color: colors.text,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  formGroup: {
    marginBottom: 20,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    height: 52,
    borderRadius: 12,
  },

  field: {
    position: "relative",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  floatingLabel: {
    position: "absolute",
    top: -10,
    left: 14,

    backgroundColor: colors.background,
    paddingHorizontal: 6,

    zIndex: 10,
    elevation: 10,

    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  textInput: {
    color: colors.text,
    fontSize: 16,
    height: 52,
  },

  textArea: {
    minHeight: 120,
    color: colors.text,
    fontSize: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  imageField: {
    // borderWidth: 1,
    // borderRadius: 12,
    backgroundColor: colors.surface,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 0,
  },

  imageTitle: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: "600",
    color: colors.text,
  },

  imageSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSecondary,
  },

  previewImage: {
    width: "100%",
    height: "100%",
  },
  postButton: {
    backgroundColor: colors.primary,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  postButtonText: {
    color: colors.header,
    fontSize: 16,
    fontWeight: "700",
  },
});
