import React from 'react';
import { useState } from 'react';
import { Pressable, Text, View, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// SRC Imports
import { styles } from '../styles/commonStyles';
import { createUser } from '../services/userService';
import { SettingsStackParamList } from '../../App';

type Props = NativeStackScreenProps<SettingsStackParamList, 'Signup'>;

export default function SignupScreen() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = () => {
        // Handle signup logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Sign Up</Text>
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
                <Pressable style={styles.saveButton} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
}