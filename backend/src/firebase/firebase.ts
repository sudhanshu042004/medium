// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsfqWOQ9vbd1j9DUib2gCgMAcXq65llew",
  authDomain: "testing-6f679.firebaseapp.com",
  projectId: "testing-6f679",
  storageBucket: "testing-6f679.appspot.com",
  messagingSenderId: "242224658070",
  appId: "1:242224658070:web:3d7ebdf2cbcabe7c3334b7",
  measurementId: "G-L9E52WKS6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);