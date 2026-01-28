import {collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp} from "firebase/firestore";
import { db } from "../config/firebase";

export interface Habit {
    id: string;
    name: string;
    frequency: 'daily' | 'weekly';
    createdAt: Date;
    updatedAt?: Date;
}

export interface NewHabit {
    name: string;
    frequency: 'daily' | 'weekly';
}

export interface UpdateHabit {
    name?: string;
    frequency?: 'daily' | 'weekly';
}

const HABITS_COLLECTION = "habits";

export const createHabit = async (habit: NewHabit): Promise<string> => {
    try{
        const habitsCollectionRef = collection(db, HABITS_COLLECTION);
        const habitData = {
            name: habit.name,
            frequency: habit.frequency,
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(habitsCollectionRef, habitData);
        console.log("Habit created with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error creating habit: ", error);
        throw error;
    }
};

export const getHabitById = async (habitId: string): Promise<Habit | null> => {
    try {
        const habitDocRef = doc(db, HABITS_COLLECTION, habitId);
        const habitSnapshot = await getDoc(habitDocRef);
        if (!habitSnapshot.exists()) {
            console.log("No such habit!");
            return null;
        }
        const data = habitSnapshot.data();
        const habit: Habit = {
            id: habitSnapshot.id,
            name: data.name,
            frequency: data.frequency,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
        };
        return habit;
    } catch (error) {
        console.error("Error getting habit: ", error);
        throw error;
    }
};

export const getAllHabits = async (): Promise<Habit[]> => {
    try {
        const habitsCollectionRef = collection(db, HABITS_COLLECTION);
        const habitsSnapshot = await getDocs(habitsCollectionRef);
        const habits: Habit[] = habitsSnapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                name: data.name,
                frequency: data.frequency,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
            };
        });
        console.log(`Fetched ${habits.length} habits.`);
        return habits;
    } catch (error) {
        console.error("Error getting habits: ", error);
        throw error;
    }
};

export const updateHabit = async (habitId: string, updates: UpdateHabit): Promise<void> => {
    try {
        const habitDocRef = doc(db, HABITS_COLLECTION, habitId);
        const updateData: any = {
            ...updates,
            updatedAt: serverTimestamp(),
        };
        await updateDoc(habitDocRef, updateData);
        console.log("Habit updated with ID: ", habitId);
    } catch (error) {
        console.error("Error updating habit: ", error);
        throw error;
    }
};

export const deleteHabit = async (habitId: string): Promise<void> => {
    try {
        const habitDocRef = doc(db, HABITS_COLLECTION, habitId);
        await deleteDoc(habitDocRef);
        console.log("Habit deleted with ID: ", habitId);
    }
    catch (error) {
        console.error("Error deleting habit: ", error);
        throw error;
    }
};

export const subscribeToHabits = (callback: (habits: Habit[]) => void): (() => void) => {
    const habitsCollectionRef = collection(db, HABITS_COLLECTION);
    const q = query(habitsCollectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const habits: Habit[] = querySnapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                name: data.name,
                frequency: data.frequency,
                createdAt: data.createdAt?.toDate?.() ?? new Date(),
                updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
            };
        });
        callback(habits);
    });
    return unsubscribe;
};