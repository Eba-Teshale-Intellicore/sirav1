import { StyleSheet } from "react-native";
import { colors, typography } from "./global";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingBottom: 50,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 12,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,

    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,

    backgroundColor: colors.header,
  },

  headerEditButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    backgroundColor: colors.surface,
  },

  /* =====================================================
     IDENTITY
  ===================================================== */

  identityCard: {
    marginHorizontal: 16,
    marginTop: 18,

    padding: 18,

    borderRadius: 18,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
  },

  identityRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,

    backgroundColor: colors.background,
  },

  avatarPlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 41,

    backgroundColor: colors.primary,

    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  identityInfo: {
    flex: 1,
    marginLeft: 16,
  },

  badgeRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,

    marginTop: 9,

    gap: 7,
  },

  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 20,

    backgroundColor: colors.primary,
  },

  roleBadgeText: {
    ...typography.badge,
    color: colors.background,

    textTransform: "capitalize" as const,
  },

  verifiedBadge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,

    paddingHorizontal: 9,
    paddingVertical: 5,

    borderRadius: 20,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,
  },

  verifiedText: {
    ...typography.label,
    color: colors.primary,
    marginLeft: 4,
  },

  identityEditButton: {
    marginTop: 16,

    height: 46,

    borderRadius: 13,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.primary,

    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  identityEditText: {
    ...typography.button,
    color: colors.primary,
    marginLeft: 7,
  },

  /* =====================================================
     SECTION
  ===================================================== */

  sectionHeader: {
    marginHorizontal: 16,
    marginTop: 28,
    marginBottom: 12,
  },

  sectionSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 3,
  },

  /* =====================================================
     REPUTATION
  ===================================================== */

  reputationCard: {
    marginHorizontal: 16,

    paddingVertical: 20,
    paddingHorizontal: 8,

    borderRadius: 18,

    backgroundColor: colors.surface,

    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-around" as const,

    borderWidth: 1,
    borderColor: colors.border,
  },

  stat: {
    flex: 1,
    alignItems: "center" as const,
  },

  statValue: {
    ...typography.stat,
    color: colors.text,
    marginTop: 5,
  },

  statLabel: {
    ...typography.statLabel,
    color: colors.textSecondary,
    marginTop: 3,
    textAlign: "center" as const,
  },

  statDivider: {
    width: 1,
    height: 42,

    backgroundColor: colors.border,
  },

  /* =====================================================
     INFO
  ===================================================== */

  infoCard: {
    marginHorizontal: 16,
    marginBottom: 10,

    padding: 15,

    borderRadius: 15,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,

    flexDirection: "row" as const,
  },

  infoIcon: {
    width: 40,
    height: 40,

    borderRadius: 12,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    backgroundColor: colors.background,
  },

  infoContent: {
    flex: 1,
    marginLeft: 13,
  },

  infoTitle: {
    ...typography.label,
    color: colors.textSecondary,
  },

  infoValue: {
    ...typography.body,
    color: colors.text,

    marginTop: 4,
    lineHeight: 21,
  },

  /* =====================================================
     SERVICES
  ===================================================== */

  servicesContainer: {
    marginHorizontal: 16,
  },

  serviceCard: {
    flexDirection: "row" as const,
    alignItems: "center" as const,

    padding: 15,
    marginBottom: 10,

    borderRadius: 16,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
  },

  serviceIcon: {
    width: 48,
    height: 48,

    borderRadius: 14,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    backgroundColor: colors.background,
  },

  serviceContent: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  serviceTitle: {
    ...typography.cardTitle,
    color: colors.text,
  },

  serviceCategory: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 3,
  },

  servicePrice: {
    ...typography.bodyMedium,
    color: colors.primary,
    marginTop: 7,
  },

  serviceArrow: {
    width: 32,
    height: 32,

    borderRadius: 16,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    backgroundColor: colors.background,
  },

  /* =====================================================
     EMPTY SERVICES
  ===================================================== */

  emptyServices: {
    padding: 24,

    borderRadius: 18,

    backgroundColor: colors.surface,

    alignItems: "center" as const,

    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyIcon: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: colors.background,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    borderWidth: 1,
    borderColor: colors.border,
  },

  emptyTitle: {
    ...typography.cardTitle,
    color: colors.text,
    marginTop: 12,
  },

  emptyDescription: {
    ...typography.body,
    color: colors.textSecondary,

    textAlign: "center" as const,

    marginTop: 6,
    lineHeight: 20,
  },

  secondaryButton: {
    marginTop: 16,

    flexDirection: "row" as const,
    alignItems: "center" as const,

    paddingHorizontal: 18,
    paddingVertical: 11,

    borderRadius: 12,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.primary,
  },

  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
    marginLeft: 5,
  },

  /* =====================================================
     CUSTOMER
  ===================================================== */

  customerCard: {
    marginHorizontal: 16,
    marginTop: 28,

    padding: 20,

    borderRadius: 18,

    backgroundColor: colors.surface,

    borderWidth: 1,
    borderColor: colors.border,
  },

  customerIcon: {
    width: 52,
    height: 52,

    borderRadius: 15,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    backgroundColor: colors.background,
  },

  customerDescription: {
    ...typography.body,
    color: colors.textSecondary,

    marginTop: 7,
    lineHeight: 21,
  },

  primaryButton: {
    height: 52,

    marginTop: 18,

    borderRadius: 14,

    backgroundColor: colors.primary,

    alignItems: "center" as const,
    justifyContent: "center" as const,

    flexDirection: "row" as const,
  },

  primaryButtonText: {
    ...typography.button,
    color: colors.background,
    marginRight: 8,
  },

  /* =====================================================
     BOTTOM EDIT
  ===================================================== */

  bottomEditButton: {
    marginHorizontal: 16,
    marginTop: 24,

    height: 52,

    borderRadius: 14,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.primary,

    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  bottomEditText: {
    ...typography.button,
    color: colors.primary,
    marginLeft: 7,
  },
});
