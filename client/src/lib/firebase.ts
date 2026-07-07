import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
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
