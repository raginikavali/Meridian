import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import clsx from 'clsx'
import { Button } from './Button'

const sizeMap = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  footer,
  // Confirm variant
  confirm,
  onConfirm,
  confirmText = 'Confirm',
  confirmVariant = 'primary',
  cancelText = 'Cancel',
  loading,
}) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.()
  }

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className={clsx(
          'modal-panel relative w-full rounded-xl bg-surface border border-border shadow-modal animate-slide-up',
          sizeMap[size]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-text-primary">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-4 p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-raised transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {children && (
          <div className="px-6 pb-4">{children}</div>
        )}

        {/* Footer */}
        {(footer || confirm) && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
            {confirm ? (
              <>
                <Button variant="secondary" size="sm" onClick={onClose} disabled={loading}>
                  {cancelText}
                </Button>
                <Button variant={confirmVariant} size="sm" onClick={onConfirm} loading={loading}>
                  {confirmText}
                </Button>
              </>
            ) : footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

// Convenience: Confirm Delete modal
export function ConfirmModal({ open, onClose, onConfirm, loading, title, message, itemName }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title || 'Confirm Delete'}
      description={message || (itemName ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.` : 'This action cannot be undone.')}
      confirm
      onConfirm={onConfirm}
      confirmText="Delete"
      confirmVariant="destructive"
      loading={loading}
      size="sm"
    />
  )
}

export const ConfirmDialog = ConfirmModal
