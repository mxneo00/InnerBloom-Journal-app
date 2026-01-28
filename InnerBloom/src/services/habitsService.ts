import {collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Habit } from "../types/Habit";