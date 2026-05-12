import React from 'react'
import { cn } from '../../utils/cn'

/**
 * PageContainer — standard page wrapper.
 * Applies top padding to clear the fixed Navbar.
 * Optionally renders a page hero header.
 */
export default function PageContainer({
  children,
  title,
  subtitle,
  badge,
  hero,
  maxWidth = '7xl',
  className,
}) {
  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <main className={cn('min-h-screen pt-16 md:pt-18', className)}>
      {/* Optional Hero / Page Header */}
      {(title || hero) && (
        <div className="relative overflow-hidden py-12 md:py-16">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-pink/5 rounded-full blur-3xl" />
            <div className="absolute top-10 left-1/4 w-[300px] h-[200px] bg-neon-purple/5 rounded-full blur-2xl" />
          </div>

          <div className={cn('relative mx-auto px-4 sm:px-6 lg:px-8', maxWidths[maxWidth] || maxWidths['7xl'])}>
            {badge && (
              <span className="inline-block text-xs font-mono font-medium px-3 py-1 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-neon-pink mb-4">
                {badge}
              </span>
            )}
            {title && (
              <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-white/50 text-base md:text-lg mt-3 max-w-2xl font-body">
                {subtitle}
              </p>
            )}
            {hero}
          </div>
        </div>
      )}

      {/* Page content */}
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 pb-16', maxWidths[maxWidth] || maxWidths['7xl'])}>
        {children}
      </div>
    </main>
  )
}
