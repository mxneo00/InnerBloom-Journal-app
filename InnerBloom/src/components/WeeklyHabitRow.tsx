import React from 'react';
import { Pressable, Text, View } from 'react-native';

// SRC imports
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import type { Habit } from '../types/habit';

type Props = {
  habit: Habit;
  checked: boolean;
  onToggleWeeklyCompletion: (habitId: string) => void;
};

export default function WeeklyHabitRow({ habit, checked, onToggleWeeklyCompletion }: Props) {
  return (
    <View style={habitStyles.habitRow}>
      <Text style={habitStyles.habitName}>{habit.name}</Text>
      <Pressable
        onPress={() => onToggleWeeklyCompletion(habit.id)}
        style={[habitStyles.weeklyBox, checked && habitStyles.weeklyBoxChecked]}
      />
    </View>
  );
}
