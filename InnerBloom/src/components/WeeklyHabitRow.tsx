import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// SRC imports
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import type { Habit } from '../types/habit';

type Props = {
  habit: Habit;
  checked: boolean;
  onToggleWeeklyCompletion: (habitId: string) => void;
  onDeleteHabit?: (habitId: string) => void;
};

export default function WeeklyHabitRow({ habit, checked, onToggleWeeklyCompletion, onDeleteHabit }: Props) {
  return (
    <View style={habitStyles.habitRow}>
      <Text style={habitStyles.habitName}>{habit.name}</Text>
      <Pressable
        onPress={() => onToggleWeeklyCompletion(habit.id)}
        style={[habitStyles.weeklyBox, checked && habitStyles.weeklyBoxChecked]}
      />
      <Pressable
          onPress={() => onDeleteHabit && onDeleteHabit(habit.id)}
          style={habitStyles.deleteButton}>
          <Ionicons name="trash-outline" size={15} color="#EF4444" />
      </Pressable>
    </View>
  );
}
