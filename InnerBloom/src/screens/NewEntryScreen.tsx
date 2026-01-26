import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

// SRC Imports
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';
import { journalScreenStyles as journalStyles } from '../styles/journalScreenStyles';

type Props = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  goBack: () => void;
};

export default function NewEntryScreen({ entries, setEntries, goBack }: Props) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (content.trim() === '') return;

    setEntries(prev => [
      ...prev,
      { id: Date.now().toString(), title: title, content: content },
    ]);

    setTitle('');
    setContent('');
    goBack();
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
          <Button title="Save Entry" onPress={handleSave} />
        </View>
    </View>
  );
}