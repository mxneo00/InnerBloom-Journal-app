import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { SettingsStackParamList } from '../../App';
import { signup } from '../services/authService';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Signup'>;

export default function SignupScreen() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSignup = async () => {
        // Handle signup logic here
        if (!email || !password) {
            Alert.alert("Email and password are required for signup.");
            return;
        }
        try {
            await signup(email, password);
            console.log("User created successfully");
            Alert.alert("Signup successful! You can now log in.");
        } catch (error) {
            Alert.alert("Error creating user. Please try again.");
            console.error("Error creating user:", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Sign Up</Text>
                {/* Username and Password Input Fields would go here */}
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.shortInput}
                />
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
                <Pressable style={styles.saveButton} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}