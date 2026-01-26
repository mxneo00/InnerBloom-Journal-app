import { StyleSheet } from 'react-native';

export const journalScreenStyles = StyleSheet.create({
  entryCount: {
    fontSize: 16,
    color: '#7A8A8A',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#d6f9df',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2f3e46',
  },
  searchContainer: {
    marginBottom: 16,
    width: '100%',
  },
  entryList: {
    paddingBottom: 24,
  },
  journalEntryLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  titleInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});