import React from 'react';
import { Pressable, Text, View } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { habitStyles } from '../styles/habitTrackerScreenStyles';

export default function HabitTrackerScreen() {
  return (
    <View style={styles.container}>
      {/* Weekly Header Section */}
      <View style={habitStyles.weeklyHeader}>
        <Text style={habitStyles.weeklyHeaderText}>This Weeks Habits</Text>
        <Text style={habitStyles.daterange}>Date1 - Date2</Text>
        <Text style={habitStyles.progress}>Progress: 12/21</Text>
        <Pressable style={habitStyles.addHabitButton}>
          <Text style={habitStyles.addHabitButtonText}>+ Add Habit</Text>
        </Pressable>
      </View>
      {/* Daily Habit Section */}
      <View style={styles.card}>
        <Text style={styles.text}>Daily Habits</Text>
      </View>
      {/* Weely Habit Section */}
      <View style={styles.card}>
        <Text style={styles.text}>Weekly Habits</Text>
      </View>
    </View>
  );
}