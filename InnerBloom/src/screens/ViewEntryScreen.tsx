import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { Entry } from '../types/entry';
import { JournalStackParamList } from '../../App';

type Props = NativeStackScreenProps<JournalStackParamList, 'ViewEntry'>;

export function ViewEntryScreen({ route }: Props) {
  const { entry } = route.params;

  return (
    <View style={styles.container}>
      <View key={entry.id} style={styles.card}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.text}>{entry.content}</Text>
      </View>
    </View>
  );
}