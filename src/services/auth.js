/**
 * services/auth.js — Firebase Auth service.
 * Handles Google sign-in, sign-out, and auth state subscription.
 */

import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { dbService } from './db'

export const authService = {
  /**
   * Sign in with Google popup.
   * On success, creates/updates the user document in Firestore.
   * @returns {Promise<import('firebase/auth').UserCredential>}
   */
  signInWithGoogle: async () => {
    const credential = await signInWithPopup(auth, googleProvider)
    const { user } = credential

    // Create or update user document in Firestore
    await dbService.upsertUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })

    return credential
  },

  /**
   * Sign out the current user.
   * @returns {Promise<void>}
   */
  signOut: async () => {
    await firebaseSignOut(auth)
  },

  /**
   * Subscribe to auth state changes.
   * @param {(user: import('firebase/auth').User | null) => void} callback
   * @returns {() => void} unsubscribe function
   */
  onAuthStateChanged: (callback) => {
    return firebaseOnAuthStateChanged(auth, callback)
  },
}
