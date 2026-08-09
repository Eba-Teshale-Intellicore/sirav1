import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "./global";

export const Styles = StyleSheet.create({
  serviceTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "500",
  },
  locationicon: {
    color: colors.primary,
    marginTop: 10,
  },
  serviceinfo: {
    padding: 16,
  },
  tabs: {
    flexDirection: "row",
    marginTop: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: colors.primary,
  },
  title: {
    fontSize: 15,
  },
  tabcon: {
    marginTop: 24,
  },
  tabtitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  desc: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
});
