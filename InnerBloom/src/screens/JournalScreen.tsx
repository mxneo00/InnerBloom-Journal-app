import React, {  useState, useMemo, useEffect } from 'react';
import { Text, View, FlatList, Pressable, TextInput, Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// SRC Imports
import { JournalStackParamList } from '../../App';
import { Entry } from '../types/entry';
import { journalScreenStyles as journalStyles } from '../styles/journalScreenStyles';
import { styles } from '../styles/commonStyles';

type Props = {
  entries: Entry[];
  navigation: NativeStackNavigationProp<
    JournalStackParamList,
    'JournalMain'
  >;
};

export default function JournalScreen({ entries, navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, [auth]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [entries, searchQuery]);

  const handleAddPress = () => {
    if (!user) {
      Alert.alert(
        'Log in required',
        'Please log in to add a new entry.',
        [
          { text: 'Cancel', style: 'cancel'},
        ]
      );
      return;
    }
    navigation.navigate('NewEntry')
  }

  return (
    <View style={styles.container}>
      <View style={journalStyles.journalHeader}>
        <View style={journalStyles.headerTextContainer}>
          <Text style={styles.title}>Your Journal Entries</Text>
          {/* Summary of total entries */}
          <Text style={journalStyles.entryCount}>Entries: {entries.length}</Text>
        </View>

        {/* Add new entry button */}
        <Pressable onPress={handleAddPress} style={journalStyles.addButton}>
          <Text style={journalStyles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Search bar placeholder (Add filtering later) */}
      <View style={journalStyles.searchContainer}>
        {/* Search bar can be implemented here in the future */}
        <TextInput
          style={journalStyles.searchInput}
          placeholder="Search journal..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* List of journal entries */}
      <FlatList 
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        contentContainerStyle = { journalStyles.entryList }
        ListEmptyComponent={() => (
          <View style={styles.card}>
            <Text style={styles.text}>No entries yet. Start journaling!</Text>
          </View>
        )}
        renderItem={({item}) => (
          <Pressable onPress={() => navigation.navigate('ViewEntry', { entry: item })}>
            <View style={styles.card}>
              <Text style={journalStyles.journalEntryLabel}>{item.title}</Text>
              <Text numberOfLines={2}>{item.content}</Text>
            </View>
          </Pressable>
        )}>
      </FlatList>
    </View>
  );
}
