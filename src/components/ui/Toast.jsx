import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import clsx from 'clsx'
import { useToast } from '../../context/ToastContext'

const toastConfig = {
  success: { icon: CheckCircle2, bg: 'bg-success-subtle border-success-muted', text: 'text-success', iconColor: 'text-success' },
  error: { icon: AlertCircle, bg: 'bg-danger-subtle border-danger-muted', text: 'text-danger', iconColor: 'text-danger' },
  warning: { icon: AlertTriangle, bg: 'bg-warning-subtle border-warning-muted', text: 'text-warning', iconColor: 'text-warning' },
  info: { icon: Info, bg: 'bg-info-subtle border-info-muted', text: 'text-info', iconColor: 'text-info' },
}

function ToastItem({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false)
  const cfg = toastConfig[toast.type] || toastConfig.info
  const Icon = cfg.icon

  const handleClose = () => {
    setExiting(true)
    setTimeout(() => onRemove(toast.id), 200)
  }

  return (
    <div
      className={clsx(
        'toast-item flex items-start gap-3 w-80 rounded-xl border p-4 shadow-elevated pointer-events-auto',
        'bg-surface',
        exiting ? 'animate-slide-out-right' : 'animate-toast-in',
        cfg.bg
      )}
    >
      <Icon size={18} className={clsx('mt-0.5 shrink-0', cfg.iconColor)} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
        )}
        <p className="text-sm text-text-secondary">{toast.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="shrink-0 text-text-tertiary hover:text-text-primary transition-colors"
      >
        <X size={15} />
      </button>
      <span className="toast-progress" style={{ animationDuration: `${toast.duration}ms` }} />
    </div>
  )
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return createPortal(
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={removeToast} />
      ))}
    </div>,
    document.body
  )
}
