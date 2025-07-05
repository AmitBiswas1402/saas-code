import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj3A7o0eujlytaKKkrjVODOqj-XtahJX4",
  authDomain: "aiprep-58e3b.firebaseapp.com",
  projectId: "aiprep-58e3b",
  storageBucket: "aiprep-58e3b.firebasestorage.app",
  messagingSenderId: "10638227999",
  appId: "1:10638227999:web:5bd400d9981161c3d0732a",
  measurementId: "G-9GZMKGFR6N"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);