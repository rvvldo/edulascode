import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration dari environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBINX6pMUHWPor91JEliqkFj21uU9T5ujA",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "edulad-3b03a.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://edulad-3b03a-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "edulad-3b03a",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "edulad-3b03a.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "959680074524",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:959680074524:web:c3e243e4ffdec484f1e0d9",
};

// Log configuration for debugging (only in development)
if (import.meta.env.DEV) {
    console.log('🔥 Firebase Config Check:', {
        hasApiKey: !!firebaseConfig.apiKey,
        hasAuthDomain: !!firebaseConfig.authDomain,
        hasDatabaseURL: !!firebaseConfig.databaseURL,
        hasProjectId: !!firebaseConfig.projectId,
        hasStorageBucket: !!firebaseConfig.storageBucket,
        projectId: firebaseConfig.projectId,
        databaseURL: firebaseConfig.databaseURL
    });
}

// Validate critical Firebase configuration
if (!firebaseConfig.projectId) {
    console.error('❌ Firebase Project ID is missing!');
    console.error('Using fallback value: edulad-3b03a');
}

if (!firebaseConfig.databaseURL) {
    console.error('❌ Firebase Database URL is missing!');
    console.error('Using fallback value: https://edulad-3b03a-default-rtdb.firebaseio.com');
}

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
    if (import.meta.env.DEV) {
        console.log('✅ Firebase initialized successfully');
    }
} catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
}

// Initialize Realtime Database dan get reference ke service
export const database: Database = getDatabase(app);

// Initialize Firebase Authentication dan get reference ke service
export const auth: Auth = getAuth(app);

// Initialize Firebase Storage dan get reference ke service
export const storage: FirebaseStorage = getStorage(app);

// Export app untuk keperluan lain
export default app;
