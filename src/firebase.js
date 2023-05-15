// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCiQx8ARNwXL7W7I_O6Of_DI8tC177YgQ",
  authDomain: "faks-projekt-17e06.firebaseapp.com",
  projectId: "faks-projekt-17e06",
  storageBucket: "faks-projekt-17e06.appspot.com",
  messagingSenderId: "125687399230",
  appId: "1:125687399230:web:239915414c11a02bf5a26f",
  measurementId: "G-66YC563HHC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
