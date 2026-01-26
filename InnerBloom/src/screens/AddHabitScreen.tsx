import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

import { habit } from '../types/habit';
import { styles } from '../styles/commonStyles';
import { habitStyles as habitStyles } from '../styles/habitTrackerScreenStyles';

type Props = {
  habits: habit[];
  setHabits: React.Dispatch<React.SetStateAction<habit[]>>;
};

export default function AddHabitScreen({ habits, setHabits }: Props) {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const handleAddHabit = () => {
    if (name.trim() === '') return;
    setHabits(prev => [
      ...prev,
      { id: Date.now().toString(), name: name, frequency: frequency, streak: 0 },
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
        <TextInput
            placeholder="Frequency (daily, weekly, monthly)"
            value={frequency}
            onChangeText={(text) => {
                if (text === 'daily' || text === 'weekly' || text === 'monthly') {
                    setFrequency(text);
                }}}
            style={habitStyles.habitInput}
        />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add Habit" onPress={handleAddHabit} />
        </View>
    </View>
  );
}