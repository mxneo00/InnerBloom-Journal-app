import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/commonStyles';

// Features to add: 
// - Current date display
// - Quick tips for journaling
// - Number of entries summary

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to InnerBloom</Text>
      <View style={styles.card}>
        {/* Current Mood Display WIP */}
        <Text style={styles.text}>Current Mood</Text>
      </View>
      <View style={styles.card}>
        {/* Options: Continue writing, Offer prompt */}
        <Text style={styles.text}>WIP</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>You've checked in # days in a row!</Text>
      </View>
    </View>
  );
}
