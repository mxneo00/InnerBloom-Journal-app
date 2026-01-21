import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';

type Props = {
  entries: Entry[];
};

export default function JournalScreen({ entries }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.entryContainer}>
      <Text style={styles.title}>Journal Entries</Text>

      {entries.length === 0 && (
        <Text style={styles.text}>No entries yet.</Text>
      )}

      {entries.map((entry, index) => (
        <View key={entry.id} style={styles.entryItem}>
          <Text style={styles.entryLabel}>Entry {index + 1}:</Text>
          <Text>{entry.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
