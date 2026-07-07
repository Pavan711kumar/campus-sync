import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQih3tCtFWmNgGO3Sja8HZSuX02f0JAVs",
  authDomain: "campussyc.firebaseapp.com",
  projectId: "campussyc",
  storageBucket: "campussyc.firebasestorage.app",
  messagingSenderId: "1015216356651",
  appId: "1:1015216356651:web:ae27e55f31d2fda2f8d96e",
  measurementId: "G-K52WL8ZG68",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testAuth() {
  try {
    console.log("Attempting to sign in...");
    await createUserWithEmailAndPassword(auth, "test2@gmail.com", "password123");
    console.log("Sign in successful!");
  } catch (error) {
    console.error("Firebase Auth Error:", error.code, error.message);
  }
  process.exit(0);
}

testAuth();
