import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/commonStyles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Journal!</Text>
      <Text>Use the tabs below to navigate.</Text>
    </View>
  );
}
