import {collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp} from "firebase/firestore";
import { db } from "../config/firebase";

export interface Entry {
    id: string;
    title: string;
    content: string;
    //mood: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface NewEntryInput {
    title: string;
    content: string;
    //mood: string;
}

export interface UpdateEntryInput {
    title?: string;
    content?: string;
    //mood?: string;
}

const entriesCollectionRef = (uid: string) => collection(db, "users", uid, "entries");

export const createEntry = async (uid: string, entry: NewEntryInput): Promise<string> => {
    try{
        const entryData = {
            title: entry.title,
            content: entry.content,
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(entriesCollectionRef(uid), entryData);
        console.log("Entry created with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error creating entry: ", error);
        throw error;
    }
};

export const getEntryById = async (uid: string, entryId: string): Promise<Entry | null> => {
    try {
        const entryDocRef = doc(db, "users", uid, "entries", entryId);
        const entrySnapshot = await getDoc(entryDocRef);
        if (!entrySnapshot.exists()) {
            console.log("No such entry!");
            return null;
        }
        const data = entrySnapshot.data();
        const entry: Entry = {
            id: entrySnapshot.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
        };
        return entry;
    } catch (error) {
        console.error("Error getting entry: ", error);
        throw error;
    }
};

export const getAllEntries = async (uid: string): Promise<Entry[]> => {
    try {
        const entriesQuery = query(entriesCollectionRef(uid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(entriesQuery);
        const entries: Entry[] = querySnapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                title: data.title,
                content: data.content,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
            };
        });
        console.log(`Fetched ${entries.length} entries.`);
        return entries;
    } catch (error) {
        console.error("Error getting entries: ", error);
        throw error;
    }
};

export const updateEntry = async (uid: string, entryId: string, updates: UpdateEntryInput): Promise<void> => {
    try {
        const entryDocRef = doc(db, "users", uid, "entries", entryId);
        const updateData: any = {
            ...updates,
            updatedAt: serverTimestamp(),
        };
        await updateDoc(entryDocRef, updateData);
        console.log("Entry updated with ID: ", entryId);
    } catch (error) {
        console.error("Error updating entry: ", error);
        throw error;
    }
};

export const deleteEntry = async (uid: string, entryId: string): Promise<void> => {
    try {
        const entryDocRef = doc(db, "users", uid, "entries", entryId);
        await deleteDoc(entryDocRef);
        console.log("Entry deleted with ID: ", entryId);
    } catch (error) {
        console.error("Error deleting entry: ", error);
        throw error;
    }
};

export const subscribeToEntries = (
    uid: string,
    callback: (entries: Entry[]) => void): (() => void) => {
    const entriesQuery = query(
        entriesCollectionRef(uid),
        orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(entriesQuery, (querySnapshot) => {
        const entries: Entry[] = querySnapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
                id: docSnapshot.id,
                title: data.title,
                content: data.content,
                createdAt: data.createdAt?.toDate?.() ?? new Date(),
                updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
            };
        });
        callback(entries);
    }, (error) => {
        console.error("Error subscribing to entries: ", error);
    });

    return unsubscribe;
};

// Additional functions for querying entries by date, mood, etc., can be added here.
    