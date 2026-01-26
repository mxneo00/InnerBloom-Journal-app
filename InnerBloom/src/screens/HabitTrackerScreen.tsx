import React from 'react';
import { Text, View } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';

export default function HabitTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracking</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Feature coming soon!</Text>
      </View>
    </View>
  );
}