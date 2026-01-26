import React from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Mood } from '../types/mood';
import { JournalStackParamList } from '../../App';
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';

type Props = {
  entries: Entry[];
  navigation: NativeStackNavigationProp<
    JournalStackParamList,
    'JournalMain'
  >;
};

export default function JournalScreen({ entries, navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.journalHeader}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Your Journal Entries</Text>
          {/* Summary of total entries WIP */}
          <Text style={styles.entryCount}>Entries: {entries.length}</Text>
        </View>

        {/* Add new entry button */}
        <Pressable onPress={() => navigation.navigate('NewEntry')} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Search bar placeholder (Add filtering later) */}
      <View style={styles.searchContainer}>
        {/* Search bar can be implemented here in the future */}
        <Text style={styles.text}>Search bar WIP</Text>
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
        renderItem={({item}) => (
          <Pressable onPress={() => navigation.navigate('ViewEntry', { entry: item })}>
            <View style={styles.card}>
              <Text style={styles.journalEntryLabel}>{item.title}</Text>
              <Text numberOfLines={2}>{item.content}</Text>
            </View>
          </Pressable>
        )}>
      </FlatList>
    </View>
  );
}
