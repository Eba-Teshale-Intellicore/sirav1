import { StyleSheet } from "react-native";
import { colors } from "./global";

import React from "react";

export const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: 10,
    padding: 5,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 36,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
