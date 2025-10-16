// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzhlg0f7OtfDgeeI4Bp-YB5U58pygeHMo",
  authDomain: "agroconecta-f32e4.firebaseapp.com",
  projectId: "agroconecta-f32e4",
  storageBucket: "agroconecta-f32e4.firebasestorage.app",
  messagingSenderId: "223835374199",
  appId: "1:223835374199:web:abc5a98ce5b1b8f7b77c72",
  measurementId: "G-19JQE9JG7C",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
