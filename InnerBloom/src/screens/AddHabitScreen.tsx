import React, { useState } from 'react';
import {Pressable, Button, TextInput, View, Text } from 'react-native';

// SRC Imports
import { Habit } from '../types/habit';
import { styles } from '../styles/commonStyles';
import { habitStyles as habitStyles } from '../styles/habitTrackerScreenStyles';

type Props = {
  addHabit: (habit: Habit) => void;
  goBack: () => void
};

export default function AddHabitScreen({ addHabit, goBack }: Props) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleAddHabit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    addHabit({
      id: Date.now().toString(),
      name: trimmed,
      frequency,
      completionsByDate: {},
      weeklyCompletion: false,
    });
    goBack();
  };

    return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
            placeholder="Habit Name"
            value={name}
            onChangeText={setName}
            style={habitStyles.habitInput}
        />

        <Text style={habitStyles.frequencyLabel}>Frequency</Text>

        <View style={habitStyles.frequencyRow}>
          <Pressable onPress={() => setFrequency('daily')} style={[habitStyles.frequencyButton, frequency === 'daily' && habitStyles.frequencySelected,]}>
            <Text style={[habitStyles.frequencyButtonText, frequency === 'daily' && habitStyles.frequencySelectedText]}>Daily</Text>
          </Pressable>
          <Pressable onPress={() => setFrequency('weekly')} style={[habitStyles.frequencyButton, frequency === 'weekly' && habitStyles.frequencySelected,]}>
            <Text style={[habitStyles.frequencyButtonText, frequency === 'weekly' && habitStyles.frequencySelectedText]}>Weekly</Text>
          </Pressable>
        </View>
        
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add Habit" onPress={handleAddHabit} />
        </View>
    </View>
  );
}