import React, { useState } from 'react';
import {Pressable, TextInput, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { habitStyles as habitStyles } from '../styles/habitTrackerScreenStyles';
import { HabitStackParamList } from '../../App';
import { createHabit } from '../services/habitsService';
import { getCurrentUser } from '../services/authService';

type Props = NativeStackScreenProps<HabitStackParamList, 'AddHabit'>;;

export default function AddHabitScreen({ navigation }: Props) {
  const user = getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
  
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  const handleAddHabit = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    try {
          await createHabit(user.uid, { name, frequency });
          setName('');
          setFrequency('daily');
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('HabitMain');
          }
        } catch (error) {
          console.error('Error saving habit:', error);
        }
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
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}>
              <Text style={styles.primaryButtonText}>Add Habit</Text>
          </Pressable>
        </View>
    </View>
  );
}