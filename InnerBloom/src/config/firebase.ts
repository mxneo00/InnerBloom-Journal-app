import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAOVukhQUvcLd9Z3LI8JZ9Cp62614iVBtk",
  authDomain: "innerbloom-c0269.firebaseapp.com",
  projectId: "innerbloom-c0269",
  storageBucket: "innerbloom-c0269.firebasestorage.app",
  messagingSenderId: "429856608166",
  appId: "1:429856608166:web:9c741de699b7dc4c6a0967"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;