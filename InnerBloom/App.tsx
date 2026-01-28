import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// SRC Imports
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import NewEntryScreen from './src/components/NewEntryScreen';
import { ViewEntryScreen } from './src/components/ViewEntryScreen';
import HabitTrackerScreen from './src/screens/HabitTrackerScreen';
import AddHabitScreen from './src/components/AddHabitScreen';
import { Entry } from './src/types/entry';
import { Habit } from './src/types/habit';
import { subscribeToEntries } from './src/services/entriesService';
import { subscribeToHabits } from './src/services/habitsService';

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

  useEffect(() => {
    const unsubscribeEntries = subscribeToEntries((fetchedEntries) => {
      setEntries(fetchedEntries);
    });

    const unsubscribeHabits = subscribeToHabits((fetchedHabits) => {
      setHabits(fetchedHabits);
    });
    return () => {
      unsubscribeEntries();
      unsubscribeHabits();
    };
  }, []);

  function JournalStack() {
    return (
      <journalStack.Navigator>
        <journalStack.Screen name="JournalMain" options={{ headerShown: false }}>
          {(props) => ( <JournalScreen {...props} entries={entries}/>)}
        </journalStack.Screen>
        <journalStack.Screen name="NewEntry" options={{ title: 'New Journal Entry' }}>
          {(props) => <NewEntryScreen {...props} />}
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
          {(props) => <AddHabitScreen {...props}  />}
        </habitStack.Screen>
      </habitStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home'){
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Journal'){
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'HabitTracker'){
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline'
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: '#2f3e46',
          tabBarInactiveTintColor: '#9aa5a8',
          headerShown: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Journal" component={JournalStack}/>
        <Tab.Screen name="HabitTracker" component={HabitStack}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
