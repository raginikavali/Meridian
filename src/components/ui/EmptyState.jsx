import React from 'react'
import clsx from 'clsx'
import { Button } from './Button'

// Inline SVG illustrations for empty/error states
function EmptyIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="60" height="44" rx="6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" className="text-border-strong" />
      <circle cx="40" cy="42" r="12" stroke="currentColor" strokeWidth="2" className="text-text-disabled" />
      <path d="M34 42h12M40 36v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text-disabled" />
      <circle cx="22" cy="14" r="4" fill="currentColor" className="text-border" />
      <circle cx="58" cy="14" r="4" fill="currentColor" className="text-border" />
      <line x1="26" y1="14" x2="54" y2="14" stroke="currentColor" strokeWidth="2" className="text-border" />
    </svg>
  )
}

function ErrorIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="2" className="text-danger-muted" />
      <path d="M40 26v20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-danger" />
      <circle cx="40" cy="53" r="2" fill="currentColor" className="text-danger" />
    </svg>
  )
}

function SearchIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="18" stroke="currentColor" strokeWidth="2" className="text-border-strong" />
      <line x1="48" y1="48" x2="64" y2="64" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-text-disabled" />
      <path d="M27 35h16M35 27v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-text-disabled" opacity="0.4" />
    </svg>
  )
}

const illustrations = {
  empty: EmptyIllustration,
  error: ErrorIllustration,
  search: SearchIllustration,
}

export function EmptyState({
  type = 'empty',
  title,
  message,
  action,
  actionLabel,
  className,
}) {
  const Illustration = illustrations[type] || EmptyIllustration

  return (
    <div className={clsx('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-5 opacity-80">
        <Illustration />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">
        {title || (type === 'error' ? 'Something went wrong' : type === 'search' ? 'No results found' : 'Nothing here yet')}
      </h3>
      <p className="text-sm text-text-tertiary max-w-xs">
        {message || (
          type === 'error'
            ? 'There was an error loading this data. Try refreshing the page.'
            : type === 'search'
            ? 'Try adjusting your search or filters to find what you\'re looking for.'
            : 'Get started by adding your first item.'
        )}
      </p>
      {action && actionLabel && (
        <div className="mt-6">
          <Button onClick={action} size="sm">{actionLabel}</Button>
        </div>
      )}
    </div>
  )
}

export function ErrorState({ onRetry }) {
  return <EmptyState type="error" action={onRetry} actionLabel="Retry" />
}
