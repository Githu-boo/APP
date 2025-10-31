// Firebase initialization (modular SDK)
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHnhZ-wxzQ9Qgf6QJ05eHgglMha2g1VTs",
  authDomain: "ai-coding-assisstant.firebaseapp.com",
  databaseURL: "https://ai-coding-assisstant-default-rtdb.firebaseio.com",
  projectId: "ai-coding-assisstant",
  storageBucket: "ai-coding-assisstant.firebasestorage.app",
  messagingSenderId: "341309703118",
  appId: "1:341309703118:web:24e949aa5feb142e47619f"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Enable persistent auth state
auth.setPersistence('LOCAL');

export default app;
