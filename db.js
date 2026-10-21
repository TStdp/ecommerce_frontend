// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYFJyyI8QGrBtFa6m-cufwgMaYnlclwwk",
  authDomain: "ecommerce-7c479.firebaseapp.com",
  projectId: "ecommerce-7c479",
  storageBucket: "ecommerce-7c479.firebasestorage.app",
  messagingSenderId: "902531355020",
  appId: "1:902531355020:web:e046b3cd02bbeb748a06a9",
  measurementId: "G-RCBPGZN80W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
