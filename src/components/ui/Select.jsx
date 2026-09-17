import React, { forwardRef, useId } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

export const Select = forwardRef(function Select(
  { label, error, helperText, className, containerClassName, required, options = [], placeholder, ...props },
  ref
) {
  const generatedId = useId()
  const selectId = props.id || generatedId
  return (
    <div className={clsx('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text-secondary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full appearance-none rounded-lg border bg-bg-tertiary text-text-primary',
            'h-9 pl-3 pr-8 text-sm transition-colors cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-accent',
            error
              ? 'border-danger focus:ring-danger'
              : 'border-border hover:border-border-strong',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map(opt => (
            typeof opt === 'string'
              ? <option key={opt} value={opt}>{opt}</option>
              : <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={15} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      {helperText && !error && <p className="text-xs text-text-tertiary">{helperText}</p>}
    </div>
  )
})
