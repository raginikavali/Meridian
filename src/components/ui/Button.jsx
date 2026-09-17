import React from 'react'
import clsx from 'clsx'

const variants = {
  primary: 'bg-accent text-text-inverse hover:bg-accent-hover shadow-sm active:scale-[0.98] font-semibold',
  secondary: 'bg-surface-raised border border-border text-text-primary hover:bg-surface-overlay hover:border-border-strong active:scale-[0.98]',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-raised active:scale-[0.98]',
  destructive: 'bg-danger text-white hover:bg-danger-hover shadow-sm active:scale-[0.98] font-semibold',
  outline: 'border border-accent text-accent hover:bg-accent-subtle active:scale-[0.98]',
}

const sizes = {
  xs: 'h-7 px-2.5 text-xs gap-1.5',
  sm: 'h-8 px-3 text-sm gap-2',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-40 select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="ml-1">Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
