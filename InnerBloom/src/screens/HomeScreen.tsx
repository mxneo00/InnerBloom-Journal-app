import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { Mood } from '../types/mood';
import { CheckInStreak } from '../types/checkInStreak';

const MOODS: { key: Mood; emoji: string }[] = [
  { key: 'Happy', emoji: '😊' },
  { key: 'Sad', emoji: '😢' },
  { key: 'Anxious', emoji: '😰' },
  { key: 'Excited', emoji: '🤩' },
  { key: 'Calm', emoji: '😌' },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const prompts = [
    "What made you smile today?",
    "Describe a challenge you overcame recently.",
    "What are you grateful for right now?",
    "Write about a memorable moment from this week.",
    "What are your goals for the upcoming month?",
  ];
  const [streak, setStreak] = useState<number>(0); // Placeholder for check-in streak

  // Get today's date in a readable format
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Select today's prompt based on the date
  const index = today.getDate() % prompts.length;
  const todaysPrompt = prompts[index];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      {/* Customized welcome message */}
      <Text style={styles.title}>Welcome back!</Text>
      {/* Display current date */}
      <Text style={styles.date}>{formattedDate}</Text>
      </View>

      <View style={styles.card}>
        {/* Current Mood Display */}
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
                  ]}>
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                </Pressable>
              );
            })}
        </View>
      </View>

      <View style={styles.card}>
        {/* Prompt card */}
        <Text style={styles.text}>Todays Reflection</Text>
        <Text style={styles.prompt}>"{todaysPrompt}"</Text>
      </View>
      
      <View style={styles.card}>
        {/* Summary of habits or streaks  (Make functional) */}
        <Text style={styles.text}>You've checked in {streak} days in a row!</Text>
      </View>

    </View>
  );
}
