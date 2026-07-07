import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import {
  initializeFirestore,
  getFirestore,
  memoryLocalCache,
  type Firestore,
} from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQih3tCtFWmNgGO3Sja8HZSuX02f0JAVs",
  authDomain: "campussyc.firebaseapp.com",
  projectId: "campussyc",
  storageBucket: "campussyc.firebasestorage.app",
  messagingSenderId: "1015216356651",
  appId: "1:1015216356651:web:ae27e55f31d2fda2f8d96e",
  measurementId: "G-K52WL8ZG68",
};

export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE?.trim() === "true";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getFirebaseApp(): FirebaseApp {
  if (!isBrowser()) {
    throw new Error("Firebase can only be used in the browser.");
  }
  if (isDemoMode) {
    throw new Error("Firebase is disabled in demo mode.");
  }
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    const firebaseApp = getFirebaseApp();
    try {
      // Memory cache avoids IndexedDB offline-state bugs in Next.js dev
      db = initializeFirestore(firebaseApp, {
        localCache: memoryLocalCache(),
        experimentalForceLongPolling: true,
      });
    } catch {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}
