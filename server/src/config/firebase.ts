import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import dotenv from 'dotenv';

dotenv.config();

try {
  if (getApps().length === 0) {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      initializeApp({
        credential: cert(serviceAccount),
        storageBucket: "campussyc.firebasestorage.app"
      });
      console.log('Firebase Admin initialized securely via Service Account Key');
    } else {
      initializeApp({
        projectId: "campussyc",
        storageBucket: "campussyc.firebasestorage.app"
      });
      console.log('Firebase Admin initialized without explicit credentials');
    }
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
