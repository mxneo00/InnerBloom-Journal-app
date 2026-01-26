import { StyleSheet } from 'react-native';

export const habitStyles = StyleSheet.create({
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
    color: '#6B7280',
  },
  progress: {
    marginTop: 6,
    fontSize: 14,
    color: '#374151',
  },
  addHabitButton: {
    position: 'absolute',
    right: 16,
    top: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E5F4EE', 
  },
  addHabitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
  },
  dailyHeader: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dailyHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  weeklyHeader: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  weeklyHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});
