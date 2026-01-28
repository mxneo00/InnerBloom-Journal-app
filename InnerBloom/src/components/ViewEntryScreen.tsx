import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { JournalStackParamList } from '../../App';

type Props = NativeStackScreenProps<JournalStackParamList, 'ViewEntry'>;

export function ViewEntryScreen({ route }: Props) {
  const { entry } = route.params;

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log('Edit entry with id:', entry.id);
  };
  const handleDelete = () => {
    // Placeholder for delete functionality
    console.log('Delete entry with id:', entry.id);
  };

  return (
    <View style={styles.container}>
      <View key={entry.id} style={styles.card}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.text}>{entry.content}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleEdit}
          style={({ pressed }) => [
            styles.editButton,
            pressed && styles.buttonPressed,
          ]}>
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>
        <Pressable 
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.buttonPressed,
          ]}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}