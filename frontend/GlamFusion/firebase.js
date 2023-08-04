// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUBfOHo8ta8wul6PK4gI1rJnqQibLotkk",
  authDomain: "glamfusion.firebaseapp.com",
  projectId: "glamfusion",
  storageBucket: "glamfusion.appspot.com",
  messagingSenderId: "53460564073",
  appId: "1:53460564073:web:cdd51b3dc0ea271b5d8af8",
  measurementId: "G-PES8Q8TBM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};