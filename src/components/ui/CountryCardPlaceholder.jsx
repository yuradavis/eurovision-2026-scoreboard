import React from 'react'
import { cn } from '../../utils/cn'

export default function CountryCardPlaceholder({
  id,
  country,
  artist,
  song,
  flag,
  runningOrder,
  score,
  rank,
  loading,
  variant = 'default',
  className,
}) {
  const flagDisplay = flag || '🏳️'

  if (loading) {
    return (
      <div className={cn('glass-card p-4 flex items-center gap-4', className)}>
        <div className="skeleton w-8 h-8 rounded-full shrink-0" />
        <div className="skeleton w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
        <div className="skeleton w-10 h-6 rounded" />
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn(
        'flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
        'bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/[0.12]',
        className
      )}>
        {runningOrder && (
          <span className="font-mono text-xs text-white/30 w-5 text-center shrink-0">
            {String(runningOrder).padStart(2, '0')}
          </span>
        )}
        <span className="text-2xl leading-none shrink-0">{flagDisplay}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-sm text-white truncate">{country}</p>
          <p className="text-white/40 text-xs truncate">{artist}</p>
        </div>
        {score !== undefined && (
          <span className="font-mono text-sm font-bold text-neon-cyan shrink-0">{score}</span>
        )}
      </div>
    )
  }

  if (variant === 'leaderboard') {
    const rankColors = {
      1: 'text-yellow-400',
      2: 'text-slate-300',
      3: 'text-amber-600',
    }

    return (
      <div className={cn(
        'flex items-center gap-4 p-4 rounded-xl transition-all duration-200',
        'bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15]',
        rank === 1 && 'border-yellow-400/20 bg-yellow-400/[0.04]',
        className
      )}>
        <span className={cn(
          'font-display font-black text-lg w-7 text-center shrink-0',
          rankColors[rank] || 'text-white/30'
        )}>
          {rank}
        </span>
        <span className="text-3xl leading-none shrink-0">{flagDisplay}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-white truncate">{country}</p>
          <p className="text-white/40 text-xs truncate">{artist} · {song}</p>
        </div>
        <div className="text-right shrink-0">
          <p className={cn(
            'font-display font-black text-xl',
            rank === 1 ? 'text-yellow-400 text-glow-pink' : 'text-white/80'
          )}>
            {score}
          </p>
          <p className="text-white/30 text-xs">pts</p>
        </div>
      </div>
    )
  }

  // default variant
  return (
    <div className={cn(
      'glass-card-hover p-4 flex items-center gap-4 cursor-pointer',
      className
    )}>
      {runningOrder && (
        <span className="font-mono text-xs text-white/25 w-6 shrink-0 text-center">
          {String(runningOrder).padStart(2, '0')}
        </span>
      )}
      <span className="text-3xl leading-none shrink-0">{flagDisplay}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-white truncate">{country}</p>
        <p className="text-white/50 text-sm truncate">{artist}</p>
        <p className="text-white/30 text-xs truncate italic">{song}</p>
      </div>
      {score !== undefined && (
        <div className="text-right shrink-0">
          <p className="font-display font-black text-2xl text-neon-cyan">{score}</p>
          <p className="text-white/25 text-xs">pts</p>
        </div>
      )}
    </div>
  )
}
