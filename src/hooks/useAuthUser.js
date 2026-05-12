/**
 * hooks/useAuthUser.js
 *
 * Convenience hook — returns the current user and common auth actions.
 * Re-exports from AuthContext for a clean import path.
 *
 * Usage:
 *   const { currentUser, isAuthenticated, signOut } = useAuthUser()
 */

export { useAuth as useAuthUser } from '../context/AuthContext'
