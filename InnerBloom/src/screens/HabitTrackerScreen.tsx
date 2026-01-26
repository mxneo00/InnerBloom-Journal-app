import React from 'react';
import { Pressable, Text, View } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { habitStyles } from '../styles/habitTrackerScreenStyles';

export default function HabitTrackerScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={habitStyles.habitHeader}>
        <Text style={habitStyles.habitHeaderText}>This Weeks Habits</Text>
        <Text style={habitStyles.daterange}>Date1 - Date2</Text>
        <Text style={habitStyles.progress}>Progress: 12/21</Text>
        <Pressable style={habitStyles.addHabitButton}>
          <Text style={habitStyles.addHabitButtonText}>+ Add Habit</Text>
        </Pressable>
      </View>

      {/* Daily Habit Section */}
      <View style={styles.card}>
        {/* Daily Header */}
        <View style={habitStyles.dailyHeader}>
          <Text style={habitStyles.dailyHeaderText}>Daily habits section</Text>
        </View>
      </View>
      
      {/* Weely Habit Section */}
      <View style={styles.card}>
        {/* Weekly Header */}
        <View style={habitStyles.weeklyHeader}>
          <Text style={habitStyles.weeklyHeaderText}>Weekly habits section</Text>
        </View>
      </View>
    </View>
  );
}