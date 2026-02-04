import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyKuHFyoADiwKQd27bEIt9uOIjjNnIhGk",
  authDomain: "innerbloom-7d769.firebaseapp.com",
  projectId: "innerbloom-7d769",
  storageBucket: "innerbloom-7d769.firebasestorage.app",
  messagingSenderId: "724292755257",
  appId: "1:724292755257:web:d1a1d7a45b048e63f992e8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;