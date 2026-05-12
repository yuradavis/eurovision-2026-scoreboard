/**
 * components/auth/ProtectedRoute.jsx
 *
 * Wraps any route that requires authentication.
 * While auth is loading, shows a full-screen spinner.
 * When unauthenticated, redirects to /login (preserving intended destination).
 *
 * Usage:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/vote" element={<Vote />} />
 *   </Route>
 *
 * For admin-only routes, pass requiredRole="admin":
 *   <Route element={<ProtectedRoute requiredRole="admin" />}>
 *     <Route path="/admin" element={<Admin />} />
 *   </Route>
 */

import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ requiredRole = null }) {
  const { currentUser, firestoreUser, isAuthLoading } = useAuth()
  const location = useLocation()

  // While Firebase resolves the initial session, show a minimal spinner
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-night-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-neon-pink border-t-transparent animate-spin" />
          <p className="text-white/30 text-sm font-mono tracking-widest uppercase">Loading…</p>
        </div>
      </div>
    )
  }

  // Not authenticated — redirect to login, remembering the destination
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Role check (admin, etc.)
  if (requiredRole && firestoreUser?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
