import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * AppLayout — root layout wrapper for all authenticated/public pages.
 * Future: wrap with auth gate for protected routes.
 */
export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-night-950">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}
