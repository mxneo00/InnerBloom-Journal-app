import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';

// SRC Imports
import { styles } from '../styles/commonStyles';

type LogInScreenProps = {
    // Define any props if needed
};

export default function LogInScreen() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogIn = () => {
        // Handle log in logic here
    };

    const createAccount = () => {
        // Handle account creation logic here
    };

    const resetPassword = () => {
        // Handle password reset logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Log In</Text>
                {/* Username and Password Input Fields would go here */}
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.saveButton} onPress={handleLogIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <Pressable onPress={createAccount}>
                    <Text style={styles.linkText}>Create Account</Text>
                </Pressable>
                <Pressable onPress={resetPassword}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </Pressable>
            </View>
        </View>
    );
}