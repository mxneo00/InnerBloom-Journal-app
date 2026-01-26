import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Entry } from '../types/entry';
import { styles } from '../styles/commonStyles';

type Props = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
};

export default function NewEntryScreen({ entries, setEntries }: Props) {
  const [text, setText] = useState('');

  const handleSave = () => {
    if (text.trim() === '') return;

    setEntries(prev => [
      ...prev,
      { id: Date.now().toString(), content: text },
    ]);

    setText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          placeholder="Write something..."
          value={text}
          onChangeText={setText}
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
