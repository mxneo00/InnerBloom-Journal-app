import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { SettingsStackParamList } from '../../App';
import { login } from '../services/authService';

type LogInScreenProps = NativeStackScreenProps<SettingsStackParamList, 'Login'>;

export default function LogInScreen() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogIn = async () => {
        // Handle log in logic here
        try {
            const user = await login(email, password);
            Alert.alert("Login successful!");
            console.log("Logged in user:", user);
        } catch (error) {
            Alert.alert("Error logging in. Please check your credentials and try again.");
            console.error("Error logging in user:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Log In</Text>
                {/* Username and Password Input Fields would go here */}
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.shortInput}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.shortInput}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.primaryButton} onPress={handleLogIn}>
                    <Text style={styles.primaryButtonText}>Log In</Text>
                </Pressable>
            </View>
        </View>
    );
}