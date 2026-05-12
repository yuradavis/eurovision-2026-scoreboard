import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GlowButton from '../components/ui/GlowButton'
import { APP_CONFIG } from '../data/eurovision2026'

export default function Login() {
  const { signInWithGoogle, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Where to go after login — default to home
  const from = location.state?.from?.pathname ?? '/'

  // Already authenticated — redirect immediately
  React.useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, from, navigate])

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
      navigate(from, { replace: true })
    } catch (err) {
      // Closed-popup is not a real error; ignore it
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        setError('Помилка входу. Спробуй ще раз.')
        console.error('Login error:', err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-night-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neon-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-cyan/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-neon-purple/5 rounded-full blur-2xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-sm">
        <div className="glass-card p-8 text-center">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple flex items-center justify-center shadow-neon-pink">
              <span className="text-3xl leading-none" role="img" aria-label="Eurovision">♪</span>
            </div>
          </div>

          <h1 className="font-display font-black text-2xl text-white mb-1">
            Eurovision <span className="gradient-text-pink">2026</span>
          </h1>
          <p className="font-body text-white/40 text-sm mb-2">Friends Scoreboard</p>
          <p className="font-body text-white/25 text-xs mb-8 font-mono tracking-widest uppercase">
            {APP_CONFIG.hostCity} · {APP_CONFIG.year}
          </p>

          <p className="text-white/50 text-sm font-body mb-6 leading-relaxed">
            Увійди, щоб приєднатися до гри та голосувати разом з друзями в реальному часі
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-xs font-body text-center">{error}</p>
            </div>
          )}

          {/* Google Sign-In button */}
          <GlowButton
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onClick={handleGoogleLogin}
            icon={
              !isLoading && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )
            }
          >
            {isLoading ? 'Вхід…' : 'Увійти через Google'}
          </GlowButton>

          {/* Privacy notice */}
          <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <p className="text-white/25 text-xs font-mono text-center leading-relaxed">
              🔒 Захищено Firebase Auth · Дані зберігаються в Firestore
            </p>
          </div>

          <div className="mt-6 neon-divider" />

          <p className="mt-5 text-white/20 text-xs font-body">
            Приватна гра лише для запрошених учасників
          </p>

          <Link
            to="/"
            className="block mt-3 text-white/30 hover:text-white/60 text-xs transition-colors duration-200 font-body"
          >
            ← Повернутися на головну
          </Link>

        </div>
      </div>
    </div>
  )
}
