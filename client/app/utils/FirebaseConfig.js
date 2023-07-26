// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHwqf3wzhXr4XTmpMCMN_lgYvR8jyuVZw",
  authDomain: "chat-2b95c.firebaseapp.com",
  projectId: "chat-2b95c",
  storageBucket: "chat-2b95c.appspot.com",
  messagingSenderId: "507601605734",
  appId: "1:507601605734:web:5e78fdfc3685f7f00349a7",
  measurementId: "G-MH2B8KC3CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth=getAuth(app)