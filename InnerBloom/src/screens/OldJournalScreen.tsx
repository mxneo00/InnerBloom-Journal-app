import React from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';

import { Mood } from '../types/mood';
import { ViewEntryScreen } from './ViewEntryScreen';

type Props = {
  entries: Entry[];
};

export default function OldJournalScreen({ entries }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.journalHeader}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Your Journal Entries</Text>
          {/* Summary of total entries */}
          <Text style={styles.entryCount}>Entries: #</Text>
        </View>

        {/* Add new entry button */}
        <Pressable onPress={() => {
          // New entry nav
        }} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Search bar placeholder (Add filtering later) */}
      <View style={styles.searchContainer}>
        {/* Search bar can be implemented here in the future */}
      </View>
      
      {/* List of journal entries */}
      <FlatList 
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle = { styles.entryList }
        ListEmptyComponent={() => (
          <View style={styles.card}>
            <Text style={styles.text}>No entries yet. Start journaling!</Text>
          </View>
        )}
        renderItem={({item, index}) => (
          <Pressable onPress={() => {
            // EntryScreen Nav
          }}>
            <View style={styles.card}>
              <Text style={styles.journalEntryLabel}>Entry {index + 1}</Text>
              <Text numberOfLines={2}>{item.content}</Text>
            </View>
          </Pressable>
        )}
        >
      
      </FlatList>
    </View>
  );
}