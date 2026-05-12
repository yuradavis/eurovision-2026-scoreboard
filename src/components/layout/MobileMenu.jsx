import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import GlowButton from '../ui/GlowButton'
import { cn } from '../../utils/cn'

export default function MobileMenu({ links }) {
  const { state } = useApp()
  const { currentUser, isAuthenticated, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Sign-out error:', err)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={cn(
        'fixed inset-0 z-40 md:hidden transition-all duration-300',
        state.isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div className={cn(
        'absolute inset-0 bg-night-950/80 backdrop-blur-sm transition-opacity duration-300',
        state.isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
      )} />

      {/* Menu panel */}
      <div className={cn(
        'absolute top-0 right-0 h-full w-[280px] max-w-[85vw]',
        'bg-night-900/95 backdrop-blur-2xl border-l border-white/[0.08]',
        'flex flex-col transition-transform duration-300 ease-out',
        state.isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      )}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.06]">
          <p className="font-display font-bold text-sm text-white/70">Навігація</p>
          <div className="w-8 h-1 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-full" />
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Mobile navigation">
          <div className="space-y-1">
            {links.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-xl font-display font-semibold text-base transition-all duration-200',
                  isActive
                    ? 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="px-4 py-5 border-t border-white/[0.06] space-y-3">
          {isAuthenticated && currentUser ? (
            <>
              {/* User info row */}
              <div className="flex items-center gap-3 px-1 mb-2">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName ?? 'User'}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full ring-1 ring-neon-pink/40 object-cover shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-sm font-bold text-white shrink-0">
                    {currentUser.displayName?.[0] ?? '?'}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white/80 text-sm font-display font-semibold truncate">
                    {currentUser.displayName}
                  </p>
                  <p className="text-white/30 text-xs font-body truncate">{currentUser.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 text-sm font-display transition-all duration-200"
              >
                Вийти
              </button>
            </>
          ) : (
            <Link to="/login" className="block">
              <GlowButton variant="primary" fullWidth>
                Login
              </GlowButton>
            </Link>
          )}
          <p className="text-center text-white/20 text-xs font-mono">
            Eurovision 2026 · Basel, Switzerland
          </p>
        </div>
      </div>
    </div>
  )
}
