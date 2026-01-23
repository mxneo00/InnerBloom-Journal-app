import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import NewEntryScreen from './src/screens/NewEntryScreen';
import { ViewEntryScreen } from './src/screens/ViewEntryScreen';
import HabitTrackerScreen from './src/screens/HabitTrackerScreen';
import { Entry } from './src/types/entry';

enableScreens(false);

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

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<JournalStackParamList>();


export default function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  function JournalStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="JournalMain">
          {() => <JournalScreen entries={entries} />}
        </Stack.Screen>
        <Stack.Screen name="NewEntry">
          {() => <NewEntryScreen entries={entries} setEntries={setEntries} />}
        </Stack.Screen>
        <Stack.Screen name="ViewEntry" component={ViewEntryScreen} />
      </Stack.Navigator>
    );}

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen name="Journal" component={JournalStack}/>

        <Tab.Screen name="HabitTracker" component={HabitTrackerScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
