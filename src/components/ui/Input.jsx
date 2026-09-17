import React, { forwardRef, useId } from 'react'
import clsx from 'clsx'

export const Input = forwardRef(function Input(
  {
    label,
    error,
    helperText,
    prefix,
    suffix,
    className,
    containerClassName,
    required,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = props.id || generatedId
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3 text-text-tertiary flex items-center pointer-events-none">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-lg border bg-bg-tertiary text-text-primary placeholder:text-text-disabled',
            'h-9 px-3 text-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-accent',
            error
              ? 'border-danger focus:ring-danger'
              : 'border-border hover:border-border-strong',
            prefix && 'pl-9',
            suffix && 'pr-9',
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 text-text-tertiary flex items-center pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-xs text-text-tertiary">{helperText}</p>
      )}
    </div>
  )
})

export const Textarea = forwardRef(function Textarea(
  { label, error, helperText, className, containerClassName, required, ...props },
  ref
) {
  const generatedId = useId()
  const textareaId = props.id || generatedId
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={clsx(
          'w-full rounded-lg border bg-bg-tertiary text-text-primary placeholder:text-text-disabled',
          'px-3 py-2 text-sm transition-colors resize-none',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-accent',
          error
            ? 'border-danger focus:ring-danger'
            : 'border-border hover:border-border-strong',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      {helperText && !error && <p className="text-xs text-text-tertiary">{helperText}</p>}
    </div>
  )
})
