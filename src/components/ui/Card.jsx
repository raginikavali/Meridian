import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

export function Card({ children, className, padding = true, ...props }) {
  return (
    <div
      className={clsx(
        'meridian-card rounded-card bg-surface border border-border shadow-card transition-theme',
        padding && 'p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, description, action, className }) {
  return (
    <div className={clsx('flex items-start justify-between gap-4', className)}>
      <div>
        {title && <h3 className="text-base font-semibold text-text-primary">{title}</h3>}
        {description && <p className="mt-0.5 text-sm text-text-tertiary">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

// Stat/KPI Card
export function MetricCard({ label, value, change, trend, prefix, suffix, icon, accent, children }) {
  const isUp = trend === 'up'
  const isDown = trend === 'down'
  const changeColor = isUp ? 'text-success' : isDown ? 'text-danger' : 'text-text-tertiary'
  const changeIcon = isUp ? '↑' : isDown ? '↓' : '→'

  const [displayValue, setDisplayValue] = useState('0')
  const rawValue = String(value)
  const numericValue = Number(rawValue.replace(/[^0-9.]/g, ''))
  const hasDecimal = rawValue.includes('.')
  const derivedPrefix = prefix ?? rawValue.match(/^[^0-9]*/)?.[0]
  const derivedSuffix = suffix ?? rawValue.match(/[^0-9.]+$/)?.[0]

  useEffect(() => {
    let frame
    const start = performance.now()
    const duration = 900
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = numericValue * eased
      setDisplayValue(hasDecimal ? next.toFixed(1) : Math.round(next).toLocaleString())
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [numericValue, hasDecimal])

  return (
    <Card className={clsx('metric-card', accent && 'metric-card-featured border-accent/30')}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-tertiary">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
            {derivedPrefix}<span>{displayValue}</span>{derivedSuffix}
          </p>
          {change != null && (
            <p className={clsx('mt-1.5 text-xs font-medium flex items-center gap-1', changeColor)}>
              <span>{changeIcon}</span>
              <span>{Math.abs(change)}% vs last month</span>
            </p>
          )}
        </div>
        {icon && (
          <div className={clsx('p-2.5 rounded-xl', accent ? 'bg-accent-subtle text-accent' : 'bg-surface-raised text-text-tertiary')}>
            {icon}
          </div>
        )}
      </div>
      {children || <MiniSparkline accent={accent} />}
    </Card>
  )
}

function MiniSparkline({ accent }) {
  const points = accent ? '0,30 16,26 32,29 48,18 64,21 80,8 96,12' : '0,25 16,21 32,24 48,14 64,18 80,11 96,14'
  return <svg className="metric-sparkline" viewBox="0 0 96 36" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} fill="none" stroke={accent ? 'var(--accent)' : 'var(--info)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
