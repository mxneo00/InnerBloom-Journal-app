import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const journalScreenStyles = StyleSheet.create({
  /* ---------- Header ---------- */
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  entryCount: {
    marginTop: 4,
    fontSize: 16,
    color: colors.textMuted, 
  },

  /* ---------- Add Entry Button ---------- */
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight, 
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary, 
  },

  /* ---------- Search / List ---------- */
  searchContainer: {
    width: '100%',
    marginBottom: 16,
  },
  entryList: {
    paddingBottom: 24,
  },

  /* ---------- Entry Inputs ---------- */
  journalEntryLabel: {
    marginBottom: 4,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  titleInput: {
    height: 40,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border, 
    borderRadius: 8,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
});
