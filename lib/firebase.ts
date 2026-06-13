// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5bv3AyH2fTqR9leg3FtFWY341Dq7h5dQ",
  authDomain: "qwetulinks-2d5be.firebaseapp.com",
  projectId: "qwetulinks-2d5be",
  storageBucket: "qwetulinks-2d5be.firebasestorage.app",
  messagingSenderId: "777372007350",
  appId: "1:777372007350:web:0dfde51a2217e9c8c51f17",
  measurementId: "G-462XKETNVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
