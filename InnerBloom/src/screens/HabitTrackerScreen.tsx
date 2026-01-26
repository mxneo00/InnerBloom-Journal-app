import React from 'react';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { habitStyles } from '../styles/habitTrackerScreenStyles';

function toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentWeekDates(): Date[] {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay(); //Sunday as first day of the week might get adjusted
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(firstDayOfWeek + i);
        weekDates.push(date);
    }
    return weekDates;
}

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
        {/* Daily Habits Row */}
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