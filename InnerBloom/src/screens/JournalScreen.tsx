import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';

type Props = {
  entries: Entry[];
};

// Features to add:
// - Entry date display
// - Search functionality
// - Filter by tags or categories
// - Edit and delete entries

// Change ScrollView to FlatList for better performance with many entries

export default function JournalScreen({ entries }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Journal Entries</Text>

      <View style={styles.card}>
        {entries.length === 0 && (
          <Text style={styles.text}>No entries yet.</Text>
        )}
      </View>
      
      {entries.map((entry, index) => (
        <View key={entry.id} style={styles.card}>
          <Text style={styles.entryLabel}>Entry {index + 1}:</Text>
          <Text>{entry.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
