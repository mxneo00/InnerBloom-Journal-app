import React, { useState } from 'react';
import {Pressable, Button, TextInput, View, Text } from 'react-native';
import type { Dispatch, SetStateAction } from 'react';

// SRC Imports
import { Habit } from '../types/habit';
import { styles } from '../styles/commonStyles';
import { habitStyles as habitStyles } from '../styles/habitTrackerScreenStyles';

type Props = {
  habits: Habit[];
  setHabits: Dispatch<SetStateAction<Habit[]>>;
};

export default function AddHabitScreen({ habits, setHabits }: Props) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleAddHabit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setHabits(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: trimmed,
        frequency,
        completionsByDate: {},
        weeklyCompletion: false,
      },
    ]);

    setName('');
    setFrequency('daily');
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
          <Pressable 
            onPress={handleAddHabit}
            style={({pressed}) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}>
              <Text style={styles.saveButtonText}>Add Habit</Text>
          </Pressable>
        </View>
    </View>
  );
}