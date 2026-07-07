"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStorage = exports.adminAuth = exports.adminDb = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const storage_1 = require("firebase-admin/storage");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
try {
    if ((0, app_1.getApps)().length === 0) {
        if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
            (0, app_1.initializeApp)({
                credential: (0, app_1.cert)(serviceAccount),
                storageBucket: "campussyc.firebasestorage.app"
            });
            console.log('Firebase Admin initialized securely via Service Account Key');
        }
        else {
            (0, app_1.initializeApp)({
                projectId: "campussyc",
                storageBucket: "campussyc.firebasestorage.app"
            });
            console.log('Firebase Admin initialized without explicit credentials');
        }
    }
}
catch (error) {
    console.error('Firebase Admin initialization error:', error);
}
exports.adminDb = (0, firestore_1.getFirestore)();
exports.adminAuth = (0, auth_1.getAuth)();
exports.adminStorage = (0, storage_1.getStorage)();
