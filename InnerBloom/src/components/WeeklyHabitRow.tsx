import React from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// SRC imports
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import type { Habit } from '../types/habit';
import { deleteHabit } from '../services/habitsService';

type Props = {
  habit: Habit;
  checked: boolean;
  onToggleWeeklyCompletion: (habitId: string) => void;
};

export default function WeeklyHabitRow({ habit, checked, onToggleWeeklyCompletion }: Props) {
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete() },
      ]
    );
  };

  const onDelete = async () => {
    try {
      await deleteHabit(habit.id);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };
  
  return (
    <View style={habitStyles.habitRow}>
      <Text style={habitStyles.habitName}>{habit.name}</Text>
      <Pressable
        onPress={() => onToggleWeeklyCompletion(habit.id)}
        style={[habitStyles.weeklyBox, checked && habitStyles.weeklyBoxChecked]}
      />
      <Pressable
          onPress={handleDelete}
          style={habitStyles.deleteButton}>
          <Ionicons name="trash-outline" size={15} color="#EF4444" />
      </Pressable>
    </View>
  );
}
