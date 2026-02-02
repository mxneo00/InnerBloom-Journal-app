import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Settings, ScrollView } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from 'firebase/auth';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { SettingsStackParamList } from '../../App';
import { subscribeToAuthChanges, logout } from '../services/authService';

type Props = {
  navigation: NativeStackNavigationProp<
    SettingsStackParamList,
    'SettingsMain'
  >;
};

export default function SettingsScreen({ navigation }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    // Implement log out functionality here
    logout().then(() => {
      navigation.navigate('Login');
    });
    console.log("User logged out");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        {/* Settings options would go here */}
        {!user ? (
          <>
          <Pressable style={styles.saveButton} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
          </>
          ) : (
            <>
            <Text style={styles.title}>Signed in</Text>
            <Text>{user.email}</Text>
            <Pressable style={styles.saveButton} onPress={handleLogOut}>
              <Text style={styles.buttonText}>Log Out</Text>
            </Pressable>
            </>
          )}
      </View>
    </ScrollView>
  );
}