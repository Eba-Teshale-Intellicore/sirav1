import { StyleSheet } from "react-native";
import { colors, typography } from "./global";

export const Styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 280,
  },

  grid: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  column: {
    justifyContent: "space-between",
    marginBottom: 22,
  },

  item: {
    width: "31%",
    alignItems: "center",
  },

  icon: {
    width: 72,
    height: 72,

    borderRadius: 18,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 9,
  },

  text: {
    ...typography.subtitle,

    color: colors.text,

    textAlign: "center",

    lineHeight: 19,
  },
});
