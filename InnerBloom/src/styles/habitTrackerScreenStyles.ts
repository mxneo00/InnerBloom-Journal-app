import { StyleSheet } from 'react-native';
import { colors } from './colors';

/* =====================================================
   HABIT STYLES
===================================================== */
export const habitStyles = StyleSheet.create({
  /* ---------- Header ---------- */
  habitHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  habitHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  daterange: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textMuted,
  },
  progress: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textSecondary,
  },

  /* ---------- Add Habit Button ---------- */
  addHabitButton: {
    position: 'absolute',
    top: 18,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
  },
  addHabitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryDark,
  },

  /* ---------- Section Headers ---------- */
  dailyHeader: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  weeklyHeader: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  dailyHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  weeklyHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  /* ---------- Inputs ---------- */
  habitInput: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },

  /* ---------- Day Labels ---------- */
  dayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    gap: 12.5,
  },
  dayHeaderText: {
    width: 18,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },

  /* ---------- Habit Rows ---------- */
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  habitName: {
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  /* ---------- Day / Week Boxes ---------- */
  dayBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10.3,
  },

  dayBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  dayBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  weeklyBox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  weeklyBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  /* ---------- Frequency Selector ---------- */
  frequencyLabel: {
    marginTop: 6,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  frequencyRow: {
    flexDirection: 'row',
    gap: 10,
  },
  frequencyButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  frequencySelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  frequencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  frequencySelectedText: {
    color: colors.primaryDark,
  },

  /* ---------- Empty State ---------- */
  emptyText: {
    paddingVertical: 16,
    textAlign: 'center',
    fontSize: 14,
    color: colors.textDisabled,
  },
});
