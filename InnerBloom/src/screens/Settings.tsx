import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Settings, ScrollView } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from 'firebase/auth';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { settingsStyles } from '../styles/settingsStyles';
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
      {/* Header */}
      <View style={settingsStyles.header}>
        <Text style={settingsStyles.headerTitle}>Settings</Text>
        <Text style={settingsStyles.headerSubtitle}>Manage your account and app preferences</Text>
      </View>

      {/* Account */}
      <View style={styles.card}>
        <Text style={settingsStyles.sectionTitle}>Account</Text>

        {!user ? (
          <>
            <View style={settingsStyles.profileRow}>
              <View style={settingsStyles.avatar}>
                <Text style={settingsStyles.avatarText}>?</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={settingsStyles.profileTitle}>Not signed in</Text>
                <Text style={settingsStyles.profileSubtext}>
                  Log in to sync entries and habits
                </Text>
              </View>
            </View>

            <View style={settingsStyles.buttonRow}>
              <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.primaryButtonText}>Sign Up</Text>
              </Pressable>
              <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.primaryButtonText}>Log In</Text>
              </Pressable>
            </View>
          </>
        ):(
          <>
            <View style={settingsStyles.profileRow}>
              <View style={settingsStyles.avatar}>
                <Text style={settingsStyles.avatarText}>{(user.email?.[0] ?? 'U').toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={settingsStyles.profileTitle}>Signed in</Text>
                <Text style={settingsStyles.profileSubtext}>{user.email}</Text>
              </View>
            </View>

            <View style={settingsStyles.buttonRow}>
              <Pressable style={styles.primaryButton} onPress={handleLogOut}>
                <Text style={styles.buttonText}>Log Out</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}