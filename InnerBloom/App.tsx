import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import NewEntryScreen from './src/screens/NewEntryScreen';
import HabitTrackerScreen from './src/screens/HabitTrackerScreen';
import { Entry } from './src/types/entry';

enableScreens(false);

type RootParamList = {
  Home: undefined;
  Journal: undefined;
  NewEntry: undefined;
  HabitTracker: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

export default function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen name="Journal">
          {() => <JournalScreen entries={entries} />}
        </Tab.Screen>

        <Tab.Screen name="NewEntry">
          {() => (
            <NewEntryScreen
              entries={entries}
              setEntries={setEntries}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="HabitTracker" component={HabitTrackerScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
