import React from 'react'
import clsx from 'clsx'

const badgeConfig = {
  // Status
  active: { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-muted', dot: 'bg-success' },
  inactive: { bg: 'bg-surface-raised', text: 'text-text-tertiary', border: 'border-border', dot: 'bg-text-disabled' },
  suspended: { bg: 'bg-danger-subtle', text: 'text-danger', border: 'border-danger-muted', dot: 'bg-danger' },
  // Order status
  placed: { bg: 'bg-info-subtle', text: 'text-info', border: 'border-info-muted', dot: 'bg-info' },
  processing: { bg: 'bg-warning-subtle', text: 'text-warning', border: 'border-warning-muted', dot: 'bg-warning' },
  shipped: { bg: 'bg-accent-subtle', text: 'text-accent', border: 'border-accent-muted', dot: 'bg-accent' },
  delivered: { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-muted', dot: 'bg-success' },
  cancelled: { bg: 'bg-danger-subtle', text: 'text-danger', border: 'border-danger-muted', dot: 'bg-danger' },
  refunded: { bg: 'bg-surface-raised', text: 'text-text-secondary', border: 'border-border', dot: 'bg-text-tertiary' },
  // Product status
  out_of_stock: { bg: 'bg-warning-subtle', text: 'text-warning', border: 'border-warning-muted', dot: 'bg-warning' },
  discontinued: { bg: 'bg-surface-raised', text: 'text-text-disabled', border: 'border-border-subtle', dot: 'bg-text-disabled' },
  // CMS status
  published: { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-muted', dot: 'bg-success' },
  draft: { bg: 'bg-surface-raised', text: 'text-text-tertiary', border: 'border-border', dot: 'bg-text-disabled' },
  // Payment
  paid: { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-muted', dot: 'bg-success' },
  pending: { bg: 'bg-warning-subtle', text: 'text-warning', border: 'border-warning-muted', dot: 'bg-warning' },
  // Roles
  Admin: { bg: 'bg-accent-subtle', text: 'text-accent', border: 'border-accent-muted', dot: 'bg-accent' },
  'Super Admin': { bg: 'bg-danger-subtle', text: 'text-danger', border: 'border-danger-muted', dot: 'bg-danger' },
  Manager: { bg: 'bg-info-subtle', text: 'text-info', border: 'border-info-muted', dot: 'bg-info' },
  Editor: { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-muted', dot: 'bg-success' },
  Customer: { bg: 'bg-surface-raised', text: 'text-text-secondary', border: 'border-border', dot: 'bg-text-tertiary' },
  Viewer: { bg: 'bg-warning-subtle', text: 'text-warning', border: 'border-warning-muted', dot: 'bg-warning' },
  // Generic
  info: { bg: 'bg-info-subtle', text: 'text-info', border: 'border-info-muted', dot: 'bg-info' },
  success: { bg: 'bg-success-subtle', text: 'text-success', border: 'border-success-muted', dot: 'bg-success' },
  warning: { bg: 'bg-warning-subtle', text: 'text-warning', border: 'border-warning-muted', dot: 'bg-warning' },
  danger: { bg: 'bg-danger-subtle', text: 'text-danger', border: 'border-danger-muted', dot: 'bg-danger' },
  accent: { bg: 'bg-accent-subtle', text: 'text-accent', border: 'border-accent-muted', dot: 'bg-accent' },
}

const defaultConfig = { bg: 'bg-surface-raised', text: 'text-text-secondary', border: 'border-border', dot: 'bg-text-tertiary' }

const labelMap = {
  out_of_stock: 'Out of Stock',
  'Super Admin': 'Super Admin',
}

export function Badge({ status, label, dot = true, size = 'sm', className }) {
  const cfg = badgeConfig[status] || defaultConfig
  const displayLabel = label ?? (labelMap[status] || (status ? status.charAt(0).toUpperCase() + status.slice(1) : ''))

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        cfg.bg, cfg.text, cfg.border,
        size === 'xs' ? 'px-1.5 py-0 text-2xs' : 'px-2.5 py-0.5 text-xs',
        className
      )}
    >
      {dot && <span className={clsx('rounded-full shrink-0', cfg.dot, size === 'xs' ? 'w-1 h-1' : 'w-1.5 h-1.5')} />}
      {displayLabel}
    </span>
  )
}

// Stock level badge
export function StockBadge({ stock }) {
  if (stock === 0) return <Badge status="out_of_stock" label="Out of Stock" />
  if (stock <= 20) return <Badge status="warning" label={`Low: ${stock}`} />
  if (stock <= 50) return <Badge status="info" label={`${stock} units`} />
  return <Badge status="success" label={`${stock} units`} />
}
