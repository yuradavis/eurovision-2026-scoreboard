/**
 * context/AuthContext.jsx — Firebase Auth context.
 *
 * Provides:
 *   currentUser    — Firebase User object or null
 *   firestoreUser  — Firestore user document or null (has role, createdAt, etc.)
 *   isAuthLoading  — true while Firebase resolves initial auth state
 *   signInWithGoogle()
 *   signOut()
 */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/auth'
import { dbService } from '../services/db'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [firestoreUser, setFirestoreUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Subscribe to Firebase auth state on mount
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      setCurrentUser(firebaseUser)

      if (firebaseUser) {
        // Load the Firestore profile (contains role, createdAt, etc.)
        try {
          const profile = await dbService.getUser(firebaseUser.uid)
          setFirestoreUser(profile)
        } catch {
          // Profile may not exist yet — upsert is handled in signInWithGoogle
          setFirestoreUser(null)
        }
      } else {
        setFirestoreUser(null)
      }

      setIsAuthLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    const credential = await authService.signInWithGoogle()
    return credential
  }

  const signOut = async () => {
    await authService.signOut()
    setCurrentUser(null)
    setFirestoreUser(null)
  }

  const value = {
    currentUser,
    firestoreUser,
    isAuthLoading,
    isAuthenticated: !!currentUser,
    signInWithGoogle,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth — hook to consume AuthContext.
 * Must be used inside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
