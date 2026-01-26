import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SRC Imports
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import NewEntryScreen from './src/screens/NewEntryScreen';
import { ViewEntryScreen } from './src/screens/ViewEntryScreen';
import HabitTrackerScreen from './src/screens/HabitTrackerScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import { Entry } from './src/types/entry';
import { Habit } from './src/types/habit';

type TabParamList = {
  Home: undefined;
  Journal: undefined;
  HabitTracker: undefined;
};

export type JournalStackParamList = {
  JournalMain: undefined;
  NewEntry: undefined;
  ViewEntry: { entry: Entry };
};

export type HabitStackParamList = {
  HabitMain: undefined;
  AddHabit: undefined;
}

const Tab = createBottomTabNavigator<TabParamList>();
const journalStack = createNativeStackNavigator<JournalStackParamList>();
const habitStack = createNativeStackNavigator<HabitStackParamList>();

export default function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);

  function JournalStack() {
    return (
      <journalStack.Navigator>
        <journalStack.Screen name="JournalMain" options={{ headerShown: false }}>
          {(props) => ( <JournalScreen {...props} entries={entries}/>)}
        </journalStack.Screen>
        <journalStack.Screen name="NewEntry" options={{ title: 'New Journal Entry' }}>
          {() => <NewEntryScreen entries={entries} setEntries={setEntries} />}
        </journalStack.Screen>
        <journalStack.Screen name="ViewEntry" component={ViewEntryScreen} options={{ title: 'View Entry' }}/>
      </journalStack.Navigator>
    );
  }

  function HabitStack() {
    return (
      <habitStack.Navigator>
        <habitStack.Screen name="HabitMain" options={{ headerShown: false }}>
          {(props) => <HabitTrackerScreen {...props} habits={habits} setHabits={setHabits} />}
        </habitStack.Screen>
        <habitStack.Screen name="AddHabit" options={{ title: 'Add Habit' }}>
          {(props) => <AddHabitScreen {...props} habits={habits} setHabits={setHabits} />}
        </habitStack.Screen>
      </habitStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journal" component={JournalStack}/>
        <Tab.Screen name="HabitTracker" component={HabitStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
