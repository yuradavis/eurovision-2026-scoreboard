import React from 'react'
import { cn } from '../../utils/cn'

/**
 * SectionCard — glassmorphic container for page sections.
 * Supports optional title, subtitle, accent color, and glow variant.
 */
export default function SectionCard({
  children,
  title,
  subtitle,
  badge,
  accent = 'pink', // 'pink' | 'cyan' | 'purple' | 'blue' | 'none'
  className,
  titleClassName,
  headerRight,
  noPadding,
}) {
  const accentClasses = {
    pink: 'border-neon-pink/20',
    cyan: 'border-neon-cyan/20',
    purple: 'border-neon-violet/20',
    blue: 'border-neon-blue/20',
    none: 'border-white/10',
  }

  const badgeAccent = {
    pink: 'bg-neon-pink/15 text-neon-pink border-neon-pink/30',
    cyan: 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30',
    purple: 'bg-neon-violet/15 text-neon-violet border-neon-violet/30',
    blue: 'bg-neon-blue/15 text-neon-blue border-neon-blue/30',
    none: 'bg-white/10 text-white/60 border-white/20',
  }

  return (
    <div
      className={cn(
        'bg-white/[0.04] backdrop-blur-md rounded-2xl border shadow-glass',
        'transition-all duration-300',
        accentClasses[accent] || accentClasses.none,
        className
      )}
    >
      {(title || subtitle || headerRight) && (
        <div className={cn(
          'flex items-start justify-between gap-4',
          noPadding ? 'p-5 pb-0' : 'px-5 pt-5 pb-0'
        )}>
          <div>
            {badge && (
              <span className={cn(
                'inline-block text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border mb-2',
                badgeAccent[accent] || badgeAccent.none
              )}>
                {badge}
              </span>
            )}
            {title && (
              <h2 className={cn(
                'font-display text-xl font-bold text-white leading-tight',
                titleClassName
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-white/50 text-sm mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerRight && (
            <div className="shrink-0">{headerRight}</div>
          )}
        </div>
      )}

      <div className={cn(!noPadding && 'p-5')}>
        {children}
      </div>
    </div>
  )
}
