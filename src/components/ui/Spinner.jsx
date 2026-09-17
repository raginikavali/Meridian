import React from 'react'
import clsx from 'clsx'

export function Spinner({ size = 'md', className }) {
  const s = { xs: 12, sm: 16, md: 24, lg: 36, xl: 48 }[size] || 24
  return (
    <svg
      className={clsx('animate-spin text-accent', className)}
      style={{ width: s, height: s }}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Spinner size="lg" />
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />
}
