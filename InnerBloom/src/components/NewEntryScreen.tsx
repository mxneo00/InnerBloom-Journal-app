import React, { useState } from 'react';
import { TextInput, View, Pressable, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { journalScreenStyles as journalStyles } from '../styles/journalScreenStyles';
import { createEntry } from '../services/entriesService';
import { JournalStackParamList } from '../../App';

type Props = NativeStackScreenProps<JournalStackParamList, 'NewEntry'>;

export default function NewEntryScreen({ navigation }: Props) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    if (content.trim() === '') return;

    try {
      await createEntry({ title, content });
      setTitle('');
      setContent('');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={journalStyles.titleInput}
        />
        <TextInput
          placeholder="Write something..."
          value={content}
          onChangeText={setContent}
          multiline
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
          <Pressable 
            onPress={handleSave}
            style={({pressed}) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}>
              <Text style={styles.saveButtonText}>Save Entry</Text>
          </Pressable>
      </View>
    </View>
  );
}