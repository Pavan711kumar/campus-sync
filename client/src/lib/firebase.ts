import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAQih3tCtFWmNgGO3Sja8HZSuX02f0JAVs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'campussyc.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'campussyc',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'campussyc.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1015216356651',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1015216356651:web:ae27e55f31d2fda2f8d96e'
};

// Only initialize if we have an API key to prevent blank page crashes
let app;
let auth: any;
let db: any;
let storage: any;

try {
  if (firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } else {
    console.error('Firebase API Key is missing. Please set VITE_FIREBASE_API_KEY in your environment variables.');
    // Export dummy objects so the app doesn't crash on import
    auth = { signOut: async () => {}, onAuthStateChanged: () => () => {} };
    db = {};
    storage = {};
  }
} catch (error) {
  console.error('Firebase initialization error', error);
}

export { auth, db, storage };
