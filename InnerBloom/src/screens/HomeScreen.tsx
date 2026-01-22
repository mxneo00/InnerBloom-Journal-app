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
      <Text style={styles.title}>Welcome to your Journal!</Text>
      <Text>Use the tabs below to navigate.</Text>
    </View>
  );
}
