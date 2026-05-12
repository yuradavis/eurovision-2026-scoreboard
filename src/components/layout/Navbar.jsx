import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import GlowButton from '../ui/GlowButton'
import MobileMenu from './MobileMenu'
import { cn } from '../../utils/cn'

const NAV_LINKS = [
  { label: 'Home',         to: '/' },
  { label: 'Semi Final 1', to: '/semi-final-1' },
  { label: 'Semi Final 2', to: '/semi-final-2' },
  { label: 'Grand Final',  to: '/grand-final' },
  { label: 'Rules',        to: '/rules' },
]

export default function Navbar() {
  const { state, actions } = useApp()
  const { currentUser, isAuthenticated, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Collapse mobile menu on route change
  useEffect(() => {
    actions.closeMobileMenu()
  }, [location.pathname])

  // Add background blur when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error('Sign-out error:', err)
    }
  }

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-night-950/90 backdrop-blur-xl border-b border-white/[0.07] shadow-glass'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="Eurovision 2026 Friends Scoreboard — Home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-neon-pink group-hover:shadow-neon-purple transition-all duration-300">
                <span className="text-lg leading-none" role="img" aria-label="music note">♪</span>
              </div>
              <div className="leading-tight">
                <p className="font-display font-black text-sm text-white tracking-wide leading-none">
                  Eurovision <span className="gradient-text-pink">2026</span>
                </p>
                <p className="font-body text-[10px] text-white/40 leading-none mt-0.5 tracking-widest uppercase">
                  Friends Scoreboard
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => cn(
                    'px-3.5 py-2 rounded-lg font-display font-medium text-sm transition-all duration-200',
                    'hover:bg-white/[0.07] hover:text-white',
                    isActive
                      ? 'text-neon-pink bg-neon-pink/10'
                      : 'text-white/60'
                  )}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {isAuthenticated && currentUser ? (
                <div className="hidden md:flex items-center gap-3">
                  {/* Avatar */}
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName ?? 'User'}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full ring-1 ring-neon-pink/40 object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center text-xs font-bold text-white">
                      {currentUser.displayName?.[0] ?? '?'}
                    </div>
                  )}

                  {/* First name */}
                  <span className="text-white/70 text-sm font-body">
                    {currentUser.displayName?.split(' ')[0]}
                  </span>

                  {/* Logout */}
                  <button
                    onClick={handleSignOut}
                    className="text-white/30 hover:text-white/70 text-xs transition-colors duration-200 font-body"
                    aria-label="Sign out"
                  >
                    Вийти
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden md:block">
                  <GlowButton variant="outline" size="sm">
                    Login
                  </GlowButton>
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={actions.toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={state.isMobileMenuOpen}
                className={cn(
                  'md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl gap-[5px]',
                  'transition-all duration-200 hover:bg-white/10',
                  state.isMobileMenuOpen && 'bg-white/10'
                )}
              >
                <span className={cn(
                  'block w-5 h-0.5 bg-white/70 rounded-full transition-all duration-300 origin-center',
                  state.isMobileMenuOpen && 'rotate-45 translate-y-[7px]'
                )} />
                <span className={cn(
                  'block w-5 h-0.5 bg-white/70 rounded-full transition-all duration-200',
                  state.isMobileMenuOpen && 'opacity-0 scale-x-0'
                )} />
                <span className={cn(
                  'block w-5 h-0.5 bg-white/70 rounded-full transition-all duration-300 origin-center',
                  state.isMobileMenuOpen && '-rotate-45 -translate-y-[7px]'
                )} />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileMenu links={NAV_LINKS} />
    </>
  )
}
