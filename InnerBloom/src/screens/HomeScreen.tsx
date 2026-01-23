import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/commonStyles';

import { Mood } from '../types/mood';

const MOODS: { key: Mood; emoji: string }[] = [
  { key: 'Happy', emoji: '😊' },
  { key: 'Sad', emoji: '😢' },
  { key: 'Anxious', emoji: '😰' },
  { key: 'Excited', emoji: '🤩' },
  { key: 'Calm', emoji: '😌' },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      {/* Customized welcome message */}
      <Text style={styles.title}>Welcome back!</Text>
      {/* Display current date */}
      <Text style={styles.date}>June 10, 2024</Text>
      </View>

      <View style={styles.card}>
        {/* Current Mood Display WIP  (Display side by side) */}
        <Text style={styles.text}>Current Mood</Text>

        <View style={styles.moodContainer}>
          {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.key;
              return (
                <Pressable
                  key={mood.key}
                  onPress={() => setSelectedMood(mood.key)}
                  style={({ pressed }) => [
                    styles.moodButton,
                    isSelected && styles.moodButtonSelected,
                    pressed && styles.moodButtonPressed,
                  ]}
                >
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                </Pressable>
              );
            })}
        </View>
      </View>

      <View style={styles.card}>
        {/* Options: Continue writing, Offer prompt */}
        <Text style={styles.text}>WIP</Text>
      </View>
      
      <View style={styles.card}>
        {/* Summary of habits or streaks  (Make functional) */}
        <Text style={styles.text}>You've checked in # days in a row!</Text>
      </View>

    </View>
  );
}
