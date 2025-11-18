/**
 * Firebase v9 (modular) initialization for a React app.
 *
 * Place your real Firebase values in `.env.local` as:
 *
 * REACT_APP_FIREBASE_API_KEY=your_api_key_here
 * REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
 * REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
 * REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
 * REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
 * REACT_APP_FIREBASE_APP_ID=your_app_id_here
 *
 * This file reads those values from process.env and initializes Firebase.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Read configuration from environment variables.
// For development, add these to `.env.local` at the project root.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services you need
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optionally export the app if you need it elsewhere
export default app;
