import React from 'react';
import { Pressable, Text, View } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import type { habit } from '../types/habit';

type Props = {
    habit: habit;
    onToggleDailyCompletion: (habitId: string, date: string) => void;
    onToggleWeeklyCompletion: (habitId: string) => void;
};

export default function DailyHabitRow({ habit, onToggleDailyCompletion, onToggleWeeklyCompletion }: Props) {
    const isDaily = habit.frequency === 'daily';

    return (
        <View style={habitStyles.habitRow}>
            <Text style={habitStyles.habitName}>{habit.name}</Text>
            {isDaily ? (
                <View style={habitStyles.dayBoxContainer}>
                    
                </View>
            ) : (

            )}
        </View>
    );
}