import React from 'react';
import { useMemo } from 'react';
import { Text, View, Pressable, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { JournalStackParamList } from '../../App';
import { deleteEntry } from '../services/entriesService';
import { Entry } from '../types/entry';
import { getCurrentUser } from '../services/authService';

type NavProps = NativeStackScreenProps<JournalStackParamList, 'ViewEntry'>;
type Props = NavProps & {
  entries: Entry[];
};

export function ViewEntryScreen({ navigation, route, entries }: Props) {
  const user = getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
  const entryId = route.params.entry.id;
  const entry = useMemo(() => {
    return entries.find(e => e.id === entryId) ?? route.params.entry;
  }, [entries, entryId, route.params.entry]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete() },
      ]
    );
  };

  const onDelete = async () => {
    try {
      await deleteEntry(user.uid, entry.id);
      navigation.navigate('JournalMain');
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <View key={entry.id} style={styles.card}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.text}>{entry.content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.navigate('EditEntry', { entry })}
          style={({ pressed }) => [
            styles.lightButton,
            pressed && styles.buttonPressed,
          ]}>
          <Text style={styles.lightButtonText}>Edit</Text>
        </Pressable>
        <Pressable 
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.darkButton,
            pressed && styles.buttonPressed,
          ]}>
          <Text style={styles.darkButtonText}>Delete</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}