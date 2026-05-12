import React from 'react'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-gradient-to-r from-neon-pink to-neon-purple hover:from-neon-purple hover:to-neon-pink shadow-neon-pink hover:shadow-neon-purple text-white',
  secondary: 'bg-gradient-to-r from-neon-blue to-neon-cyan hover:from-neon-cyan hover:to-neon-blue shadow-neon-blue hover:shadow-neon-cyan text-white',
  ghost: 'bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white/80 hover:text-white',
  outline: 'bg-transparent border border-neon-pink/50 hover:bg-neon-pink/10 hover:border-neon-pink text-neon-pink hover:shadow-neon-pink',
  danger: 'bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
  xl: 'px-9 py-4 text-lg rounded-2xl gap-3',
}

/**
 * GlowButton — primary interactive button component.
 * Supports multiple visual variants and sizes.
 */
export default function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon,
  iconRight,
  fullWidth,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-display font-semibold tracking-wide',
        'transition-all duration-300 cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/50 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
    </button>
  )
}
