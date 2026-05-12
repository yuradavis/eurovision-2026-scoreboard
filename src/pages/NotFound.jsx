import React from 'react'
import { Link } from 'react-router-dom'
import GlowButton from '../components/ui/GlowButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-night-950 flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-8xl mb-6">🎵</p>
        <h1 className="font-display font-black text-6xl text-white mb-2">404</h1>
        <p className="font-display text-xl text-white/50 mb-2">Сторінку не знайдено</p>
        <p className="text-white/30 text-sm font-body mb-8">
          Ця країна не пройшла до Grand Final…
        </p>
        <Link to="/">
          <GlowButton variant="primary">Повернутися на Home</GlowButton>
        </Link>
      </div>
    </div>
  )
}
