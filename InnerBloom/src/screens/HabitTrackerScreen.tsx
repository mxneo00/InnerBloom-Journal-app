import React, { useMemo, useState, useEffect } from 'react';
import { ScrollView, Pressable, Text, View, Alert } from 'react-native';
import type { Dispatch, SetStateAction } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { habitStyles } from '../styles/habitTrackerScreenStyles';
import DailyHabitRow from '../components/DailyHabitRow';
import WeeklyHabitRow from '../components/WeeklyHabitRow';
import type { Habit } from '../types/habit';
import { HabitStackParamList } from '../../App';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

type Props = {
  habits: Habit[];
  setHabits: Dispatch<SetStateAction<Habit[]>>;
  navigation: NativeStackNavigationProp<
      HabitStackParamList,
      'HabitMain'
    >;
};

function toDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentWeekDates(): Date[] {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay(); //Sunday as first day of the week might get adjusted
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(firstDayOfWeek + i);
        weekDates.push(date);
    }
    return weekDates;
}

export default function HabitTrackerScreen({ habits, setHabits, navigation }: Props) {
  const weekDates = useMemo(() => getCurrentWeekDates(), []);
  const weekDateKeys = useMemo(() => weekDates.map(toDateKey), [weekDates]);
  const weekKey = useMemo(() => toDateKey(weekDates[0]), [weekDates]);

  const dailyHabits = habits.filter((h) => h.frequency === 'daily');
  const weeklyHabits = habits.filter((h) => h.frequency === 'weekly');

  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, [auth]);

  const onToggleDailyCompletion = (habitId: string, dateKey: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const current = !!h.completionsByDate?.[dateKey];
        return {
          ...h,
          completionsByDate: {
            ...(h.completionsByDate ?? {}),
            [dateKey]: !current,
          },
        };
      })
    );
  };

  const onToggleWeeklyCompletion = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        return {...h, weeklyCompletion: !h.weeklyCompletion};
      })
    );
  };

  const handleAddPress = () => {
      if (!user) {
        Alert.alert(
          'Log in required',
          'Please log in to add a new habit.',
          [
            { text: 'Cancel', style: 'cancel'},
          ]
        );
        return;
      }
      navigation.navigate('AddHabit')
    }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={habitStyles.habitHeader}>
        <Text style={habitStyles.habitHeaderText}>This Weeks Habits</Text>
        <Text style={habitStyles.daterange}>{weekDateKeys[0]} : {weekDateKeys[6]}</Text>
        {/*<Text style={habitStyles.progress}>Progress: 12/21</Text>*/}
        <Pressable onPress={handleAddPress} style={habitStyles.addHabitButton}>
          <Text style={habitStyles.addHabitButtonText}>+ Add Habit</Text>
        </Pressable>
      </View>
      
      <ScrollView>
        {/* Daily Habit Section */}
      <View style={styles.card}>
        {/* Daily Header */}
        <View style={habitStyles.dailyHeader}>
          <Text style={habitStyles.dailyHeaderText}>Daily habits</Text>
        </View>
        {/* Day Labels */}
        <View style={habitStyles.dayHeaderRow}>
          {DAY_LABELS.map((d, idx) => (
            <Text key={`${d}-${idx}`} style={habitStyles.dayHeaderText}>
              {d}
            </Text>
          ))}
        </View>
        {/* Rows */}
        {dailyHabits.length === 0 ? (
          <Text style={habitStyles.emptyText}>No daily habits yet.</Text>
        ) : (
          dailyHabits.map((habit) => (
            <DailyHabitRow
              key={habit.id}
              habit={habit}
              weekDateKeys={weekDateKeys}
              onToggleDailyCompletion={onToggleDailyCompletion}
            />
          ))
        )}
      </View>

        {/* Weekly Habit Section */}
      <View style={styles.card}>
        <View style={habitStyles.weeklyHeader}>
          <Text style={habitStyles.weeklyHeaderText}>Weekly Habits</Text>
        </View>

        {weeklyHabits.length === 0 ? (
          <Text style={habitStyles.emptyText}>No weekly habits yet.</Text>
        ) : (
          weeklyHabits.map((habit) => (
            <WeeklyHabitRow
              key={habit.id}
              habit={habit}
              checked={!!habit.weeklyCompletion}
              onToggleWeeklyCompletion={onToggleWeeklyCompletion}
            />
          ))
        )}
      </View>
      </ScrollView>
    </View>
  );
}