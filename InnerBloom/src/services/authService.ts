import {
  createUserWithEmailAndPassword,  // Create new user account
  signInWithEmailAndPassword,       // Sign in existing user
  signOut,                          // Sign out current user
  sendPasswordResetEmail,           // Send password reset email
  onAuthStateChanged,               // Listen for auth state changes
  updateProfile,                    // Update user's display name/photo
  User                              // TypeScript type for Firebase user
} from 'firebase/auth';

import { auth } from '../config/firebase';

export interface AuthResult {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  };
}

export const signup = async (email: string, password: string, displayName?: string): Promise<AuthResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: displayName });
    }
    console.log("User signed up:", userCredential.user);
    const user = userCredential.user;
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      },
    };
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        const user = userCredential.user;
        return {
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            },
        };
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};

export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error;
    }
};

export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) => {
    return onAuthStateChanged(auth, callback);
};