import React, { useMemo } from 'react';
import { Text, View, FlatList, Pressable, Settings } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { SettingsStackParamList } from '../../App';


type Props = {
  navigation: NativeStackNavigationProp<
    SettingsStackParamList,
    'SettingsMain'
  >;
};

export default function SettingsScreen({ navigation }: Props) {

  const handleLogOut = () => {
    // Implement log out functionality here
    console.log("User logged out");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        {/* Settings options would go here */}
        <Pressable style={styles.saveButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Go to Sign Up</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Go to Log In</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleLogOut}>
            <Text style={styles.buttonText}>LogOut</Text>
        </Pressable>
      </View>
    </View>
  );
}