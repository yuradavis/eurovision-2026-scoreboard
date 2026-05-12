import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import AppLayout from './components/layout/AppLayout'

// Pages
import Home from './pages/Home'
import SemiFinal1 from './pages/SemiFinal1'
import SemiFinal2 from './pages/SemiFinal2'
import GrandFinal from './pages/GrandFinal'
import Rules from './pages/Rules'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

// Auth
// import ProtectedRoute from './components/auth/ProtectedRoute'
// Uncomment above and wrap routes when voting pages are ready.

/**
 * App — root component.
 *
 * Provider order (outermost → innermost):
 *   AuthProvider  — Firebase auth state (persists across refreshes)
 *   AppProvider   — UI state, phase, vote drafts
 *
 * Routing structure:
 *   /                → Home
 *   /semi-final-1    → Semi Final 1
 *   /semi-final-2    → Semi Final 2
 *   /grand-final     → Grand Final
 *   /rules           → Rules
 *   /login           → Login (standalone page, no Navbar/Footer)
 *   *                → 404 NotFound
 */
export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          {/* Standalone pages (no Navbar/Footer) */}
          <Route path="/login" element={<Login />} />

          {/* App layout pages */}
          <Route element={<AppLayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/semi-final-1" element={<SemiFinal1 />} />
            <Route path="/semi-final-2" element={<SemiFinal2 />} />
            <Route path="/grand-final" element={<GrandFinal />} />
            <Route path="/rules" element={<Rules />} />

            {/*
              Future protected routes (Stage 3):
              <Route element={<ProtectedRoute />}>
                <Route path="/vote/semi-1" element={<VoteSemi1 />} />
              </Route>
            */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </AuthProvider>
  )
}

function AppLayoutWrapper() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
