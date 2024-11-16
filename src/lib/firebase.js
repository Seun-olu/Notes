// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKvwThnQzc1l06pZ3FzGRXKHHb7cMMjEM",
  authDomain: "note-hive-a3f9f.firebaseapp.com",
  projectId: "note-hive-a3f9f",
  storageBucket: "note-hive-a3f9f.firebasestorage.app",
  messagingSenderId: "650797793210",
  appId: "1:650797793210:web:cc2c7695a1044ebdfa6783",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
