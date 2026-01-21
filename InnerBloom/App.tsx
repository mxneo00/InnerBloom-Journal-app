import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

enableScreens(false); // call this before NavigationContainer, Fixes Building Errors

type Entry = {
  id: string;
  content: string;
};

type RootParamList = {
  Home: undefined;
  Journal: undefined;
  NewEntry: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

function HomeTab() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Journal!</Text>
      <Text>Use the tabs below to navigate.</Text>
    </View>
  );
}

function JournalTab({entries}: {entries: Entry[]}) {
  return (
    <ScrollView contentContainerStyle={styles.entryContainer}>
      <Text style={styles.title}>Journal Entries</Text>
      {entries.length === 0 && (
        <Text style={styles.text}>No entries yet.</Text>
      )}
      {entries.map((entry, index) => (
        <View key={entry.id} style={styles.entryItem}>
          <Text style={styles.entryLabel}>Entry {index + 1}:</Text>
          <Text>{entry.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function NewEntryTab({entries, setEntries}: {entries: Entry[], setEntries: React.Dispatch<React.SetStateAction<Entry[]>>}) {
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
    <View style={styles.entryContainer}>
      <Text style={styles.title}>New Journal Entry</Text>

      <TextInput
        placeholder="Write something..."
        value={text}
        onChangeText={setText}
        multiline={true}
        editable={true}      // default is true, explicit boolean
        selectTextOnFocus={false}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save Entry" onPress={handleSave} />
      </View>
    </View>
  );
}

export default function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Journal">
          {() => <JournalTab entries={entries} />}
        </Tab.Screen>
        <Tab.Screen name="NewEntry">
          {() => (<NewEntryTab entries={entries} setEntries={setEntries}/>)}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  entryContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  entryItem: {
    marginBottom: 12,
  },
  entryLabel: {
    fontWeight: 'bold',
  },
});