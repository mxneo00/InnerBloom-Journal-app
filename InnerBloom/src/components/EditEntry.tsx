import React, { useState } from 'react';
import { TextInput, View, Pressable, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { journalScreenStyles as journalStyles } from '../styles/journalScreenStyles';
import { updateEntry } from '../services/entriesService';
import { JournalStackParamList } from '../../App';
import { getCurrentUser } from '../services/authService';

type Props = NativeStackScreenProps<JournalStackParamList, 'EditEntry'>;

export default function EditEntry({ navigation, route }: Props) {
  const user = getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
  const { entry } = route.params;

  const [content, setContent] = useState(entry.content);
  const [title, setTitle] = useState(entry.title);

  const handleSave = async () => {
    if (content.trim() === '') return;

    try {
        await updateEntry(user.uid, entry.id, { 
            title: title.trim(), 
            content: content.trim() 
        });
        if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('ViewEntry', { entry });
      }
    } catch (error) {
        console.error('Error updating entry:', error);
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
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}>
              <Text style={styles.primaryButtonText}>Save Entry</Text>
          </Pressable>
      </View>
    </View>
  );
}