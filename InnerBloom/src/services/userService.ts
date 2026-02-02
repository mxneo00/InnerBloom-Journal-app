import {collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp} from "firebase/firestore";
import { db } from "../config/firebase";

export interface User {
    id: string;
    username: string;
    email: string;
}

const USERS_COLLECTION = "users";

export const createUser = async (user: Omit<User, 'id'>): Promise<string> => {
    try{
        const usersCollectionRef = collection(db, USERS_COLLECTION);
        const userData = {
            username: user.username,
            email: user.email,
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(usersCollectionRef, userData);
        console.log("User created with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error creating user: ", error);
        throw error;
    }
};

export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const userDocRef = doc(db, USERS_COLLECTION, userId);
        const userSnapshot = await getDoc(userDocRef);
        if (!userSnapshot.exists()) {
            console.log("No such user!");
            return null;
        }
        const data = userSnapshot.data();
        const user: User = {
            id: userSnapshot.id,
            username: data.username,
            email: data.email,
        };
        return user;
    } catch (error) {
        console.error("Error getting user: ", error);
        throw error;
    }
};

export const updateUser = async (userId: string, updates: Partial<Omit<User, 'id'>>): Promise<void> => {
    try {
        const userDocRef = doc(db, USERS_COLLECTION, userId);
        await updateDoc(userDocRef, updates);
        console.log("User updated with ID: ", userId);
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        const userDocRef = doc(db, USERS_COLLECTION, userId);
        await deleteDoc(userDocRef);
        console.log("User deleted with ID: ", userId);
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersCollectionRef = collection(db, USERS_COLLECTION);
        const querySnapshot = await getDocs(usersCollectionRef);
        const users: User[] = querySnapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                username: data.username,
                email: data.email,
            };
        }
        );
        console.log(`Fetched ${users.length} users.`);
        return users;
    } catch (error) {
        console.error("Error getting users: ", error);
        throw error;
    }
};

export const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const usersCollectionRef = collection(db, USERS_COLLECTION);
        const usersQuery = query(usersCollectionRef, where("username", "==", username));
        const querySnapshot = await getDocs(usersQuery);
        if (querySnapshot.empty) {
            console.log("No user found with username: ", username);
            return null;
        }
        const docSnapshot = querySnapshot.docs[0];
        const data = docSnapshot.data();
        const user: User = {
            id: docSnapshot.id,
            username: data.username,
            email: data.email,
        };
        return user;
    } catch (error) {
        console.error("Error getting user by username: ", error);
        throw error;
    }
};

export const onUserChange = (userId: string, callback: (user: User | null) => void): () => void => {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (!docSnapshot.exists()) {
            console.log("User document does not exist for ID: ", userId);
            callback(null);
            return;
        }
        const data = docSnapshot.data();
        const user: User = {
            id: docSnapshot.id,
            username: data.username,
            email: data.email,
        };
        callback(user);
    }, (error) => {
        console.error("Error listening to user changes: ", error);
    });
    return unsubscribe;
};