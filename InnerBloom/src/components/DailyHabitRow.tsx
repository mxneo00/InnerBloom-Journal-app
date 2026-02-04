import React from 'react';
import { Pressable, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// SRC Imports
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import type { Habit } from '../types/habit';
import { deleteHabit } from '../services/habitsService';
import { getCurrentUser } from '../services/authService';

type Props = {
    habit: Habit;
    weekDateKeys: string[];
    onToggleDailyCompletion: (habitId: string, date: string) => void;
};

export default function DailyHabitRow({ habit, weekDateKeys, onToggleDailyCompletion }: Props) {
    const user = getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      
    const handleDelete = () => {
        Alert.alert(
          'Delete Habit',
          'Are you sure you want to delete this habit?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => onDelete() },
          ]
        );
      };
    
      const onDelete = async () => {
        try {
          await deleteHabit(user.uid, habit.id);
        } catch (error) {
          console.error('Error deleting habit:', error);
        }
      };

    return (
        <View style={habitStyles.habitRow}>
            <Text style={habitStyles.habitName}>{habit.name}</Text>
            <View style={habitStyles.dayBoxContainer}>
                {weekDateKeys.map((dateKey) => {
                    const checked = !!habit.completionsByDate?.[dateKey];
                    return (
                        <Pressable 
                            key={dateKey} 
                            onPress={() => onToggleDailyCompletion(habit.id, dateKey)}
                            style={[habitStyles.dayBox, checked && habitStyles.dayBoxChecked,]}
                        />
                    );
                })}
            </View>
            <Pressable
                onPress={handleDelete}
                style={habitStyles.deleteButton}>
                <Ionicons name="trash-outline" size={15} color="#EF4444" />
            </Pressable>
        </View>
    );
}