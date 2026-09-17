import React from 'react'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ page, pageCount, onPageChange, pageSize, totalCount, className }) {
  if (pageCount <= 1) return null

  const pages = []
  const delta = 1
  const left = Math.max(2, page - delta)
  const right = Math.min(pageCount - 1, page + delta)

  pages.push(1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < pageCount - 1) pages.push('...')
  if (pageCount > 1) pages.push(pageCount)

  return (
    <div className={clsx('flex items-center justify-between gap-4 text-sm', className)}>
      {totalCount != null && (
        <span className="text-text-tertiary text-xs whitespace-nowrap">
          {Math.min((page - 1) * pageSize + 1, totalCount)}–{Math.min(page * pageSize, totalCount)} of {totalCount}
        </span>
      )}
      <div className="flex items-center gap-1">
        <PagBtn onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Previous">
          <ChevronLeft size={15} />
        </PagBtn>
        {pages.map((p, i) =>
          p === '...'
            ? <span key={`dots-${i}`} className="px-1 text-text-tertiary">…</span>
            : <PagBtn key={p} onClick={() => onPageChange(p)} active={p === page}>{p}</PagBtn>
        )}
        <PagBtn onClick={() => onPageChange(page + 1)} disabled={page === pageCount} aria-label="Next">
          <ChevronRight size={15} />
        </PagBtn>
      </div>
    </div>
  )
}

function PagBtn({ children, active, disabled, ...props }) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition-colors',
        'disabled:opacity-40 disabled:pointer-events-none',
        active
          ? 'bg-accent text-text-inverse font-semibold'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
