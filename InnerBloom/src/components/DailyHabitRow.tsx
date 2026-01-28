import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// SRC Imports
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import type { Habit } from '../types/habit';

type Props = {
    habit: Habit;
    weekDateKeys: string[];
    onToggleDailyCompletion: (habitId: string, date: string) => void;
    onDeleteHabit?: (habitId: string) => void;
};

export default function DailyHabitRow({ habit, weekDateKeys, onToggleDailyCompletion, onDeleteHabit }: Props) {
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
                onPress={() => onDeleteHabit && onDeleteHabit(habit.id)}
                style={habitStyles.deleteButton}>
                <Ionicons name="trash-outline" size={15} color="#EF4444" />
            </Pressable>
        </View>
    );
}