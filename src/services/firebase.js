/**
 * firebase.js — Firebase app initialization.
 * Import from this file wherever Firebase services are needed.
 */

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCqz9rRUcYyUGMnGYTeW7fnVMUckzd1ETU',
  authDomain: 'eurovision-2026-scoreboard.firebaseapp.com',
  projectId: 'eurovision-2026-scoreboard',
  storageBucket: 'eurovision-2026-scoreboard.firebasestorage.app',
  messagingSenderId: '613807432979',
  appId: '1:613807432979:web:7be86f09f3395efe0ca6e6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

// Firestore
export const db = getFirestore(app)

export default app
