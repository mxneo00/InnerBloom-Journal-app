import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F7F4',
  },
  header: {
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    color: '#7A8A8A',
  },
  card: {
    backgroundColor: '#d6f9df', 
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#577568',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  buttonText: {
    fontSize: 24,
  },
  entryItem: {
    marginBottom: 12,
  },
  entryLabel: {
    fontWeight: 'bold',
  },
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
    backgroundColor: '#d6f9df',
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
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
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
});
