import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/commonStyles';


export function ViewEntryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entry</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Feature coming soon!</Text>
      </View>
    </View>
  );
}