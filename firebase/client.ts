// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj3A7o0eujlytaKKkrjVODOqj-XtahJX4",
  authDomain: "aiprep-58e3b.firebaseapp.com",
  projectId: "aiprep-58e3b",
  storageBucket: "aiprep-58e3b.firebasestorage.app",
  messagingSenderId: "10638227999",
  appId: "1:10638227999:web:5bd400d9981161c3d0732a",
  measurementId: "G-9GZMKGFR6N"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);