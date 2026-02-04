import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const styles = StyleSheet.create({
  /* ---------- Layout ---------- */
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundAlt,
  },
  header: {
    marginBottom: 28,
  },

  /* ---------- Text ---------- */
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textPrimary,
  },
  date: {
    fontSize: 14,
    color: colors.textMuted,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  prompt: {
    fontSize: 18,
    fontStyle: 'italic',
    color: colors.textPrimary,
    marginTop: 8,
  },
  linkText: {
    color: colors.link,
    textDecorationLine: 'underline',
  },

  /* ---------- Card ---------- */
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,

    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },

  /* ---------- Inputs ---------- */
  input: {
    height: 150,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  shortInput: {
    height: 40,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border, 
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },

  /* ---------- Buttons ---------- */
  buttonContainer: {
    marginTop: 8,
  },
  buttonText: {
    fontSize: 24,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  deleteButton: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: colors.primaryExtraLight,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  editButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },

  /* ---------- Mood Picker ---------- */
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  moodButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  moodButtonSelected: {
    backgroundColor: '#b2d3c5',
  },
  moodButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  emoji: {
    fontSize: 26,
  },
});
