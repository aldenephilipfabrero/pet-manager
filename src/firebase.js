import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC3Ptbj8udhCh4nVgGmJR2J6tR1rmMvieo",
  authDomain: "pet-information-manager-aa3c5.firebaseapp.com",
  databaseURL: "https://pet-information-manager-aa3c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pet-information-manager-aa3c5",
  storageBucket: "pet-information-manager-aa3c5.firebasestorage.app",
  messagingSenderId: "100255733561",
  appId: "1:100255733561:web:a162fb0d6272d260defae8",
  measurementId: "G-75FJRLKXZ3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);