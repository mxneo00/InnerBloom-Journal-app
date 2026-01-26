import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';

type Props = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
};

export default function NewEntryScreen({ entries, setEntries }: Props) {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
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