import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration dari environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://edulad-3b03a-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Log configuration for debugging (only in development)
if (import.meta.env.DEV) {
    console.log('Firebase Config Check:', {
        hasApiKey: !!firebaseConfig.apiKey,
        hasAuthDomain: !!firebaseConfig.authDomain,
        hasDatabaseURL: !!firebaseConfig.databaseURL,
        hasProjectId: !!firebaseConfig.projectId,
        databaseURL: firebaseConfig.databaseURL
    });
}

// Validate critical Firebase configuration
if (!firebaseConfig.databaseURL) {
    console.error('❌ Firebase Database URL is missing!');
    console.error('Please check your .env.local file and ensure VITE_FIREBASE_DATABASE_URL is set');
    throw new Error('Firebase Database URL is required');
}

if (!firebaseConfig.projectId) {
    console.error('❌ Firebase Project ID is missing!');
    throw new Error('Firebase Project ID is required');
}

// Initialize Firebase
let app;
try {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
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
