import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyD2e7qm7qtcuYxJPRxbFl6LcCdnqc5hQe8",
  authDomain: "advanced-react-todo.firebaseapp.com",
  projectId: "advanced-react-todo",
  storageBucket: "advanced-react-todo.appspot.com",
  messagingSenderId: "1030833643837",
  appId: "1:1030833643837:web:3f02b35ea2c557ab04a554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db