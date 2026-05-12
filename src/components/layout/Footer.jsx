import React from 'react'
import { Link } from 'react-router-dom'
import { APP_CONFIG } from '../../data/eurovision2026'

const FOOTER_LINKS = [
  { label: 'Home',         to: '/' },
  { label: 'Semi Final 1', to: '/semi-final-1' },
  { label: 'Semi Final 2', to: '/semi-final-2' },
  { label: 'Grand Final',  to: '/grand-final' },
  { label: 'Rules',        to: '/rules' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/[0.06] bg-night-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div>
            <p className="font-display font-black text-white text-lg leading-none">
              Eurovision <span className="gradient-text-pink">2026</span>
            </p>
            <p className="text-white/30 text-xs mt-1 font-mono tracking-widest uppercase">
              Friends Scoreboard · {APP_CONFIG.hostCity}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            {FOOTER_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-white/40 hover:text-white/80 text-sm font-display transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="neon-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs font-body text-center sm:text-left">
            Приватна гра для голосування з друзями. Не пов'язано з EBU або офіційним Eurovision Song Contest.
          </p>
          <p className="text-white/15 text-xs font-mono shrink-0">
            {APP_CONFIG.year} · Made with ♥
          </p>
        </div>

      </div>
    </footer>
  )
}
