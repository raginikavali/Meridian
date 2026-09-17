import React, { useMemo, useState } from 'react'
import clsx from 'clsx'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from 'lucide-react'
import { Input } from './Input'
import { Pagination } from './Pagination'
import { EmptyState } from './EmptyState'
import { sortByKey } from '../../utils/formatters'
import { useDebounce } from '../../hooks/useDebounce'

const PAGE_SIZE_OPTIONS = [10, 25, 50]

export function DataTable({
  columns,           // { key, label, render, sortable, width, align }
  data,
  loading,
  error,
  searchable = true,
  searchPlaceholder = 'Search...',
  searchKeys,        // array of keys to search across
  filters,           // React node — filter controls rendered above table
  actions,           // React node — action buttons (e.g. Add)
  emptyTitle,
  emptyMessage,
  defaultSort,       // { key, dir }
  pageSize: initialPageSize = 10,
  rowKey = 'id',
  onRowClick,
  stickyFirstCol = false,
  mobileCard,
  onRetry,
}) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 220)
  const [sortKey, setSortKey] = useState(defaultSort?.key || null)
  const [sortDir, setSortDir] = useState(defaultSort?.dir || 'asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  // Search
  const searched = useMemo(() => {
    if (!debouncedQuery.trim()) return data
    const q = debouncedQuery.toLowerCase()
    const keys = searchKeys || columns.map(c => c.key)
    return data.filter(row =>
      keys.some(k => {
        const v = row[k]
        return v != null && String(v).toLowerCase().includes(q)
      })
    )
  }, [data, debouncedQuery, searchKeys, columns])

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return searched
    return sortByKey(searched, sortKey, sortDir)
  }, [searched, sortKey, sortDir])

  // Paginate
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPage(1)
  }

  const renderCell = (column, row) => column.render ? column.render(row[column.key], row) : row[column.key] ?? '—'

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {searchable && (
          <div className="flex-1 min-w-52">
            <Input
              value={query}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
              prefix={<Search size={14} />}
              className="pl-8"
              containerClassName="flex-1"
            />
          </div>
        )}
        {filters && <div className="flex flex-wrap items-center gap-2">{filters}</div>}
        {actions && <div className="flex items-center gap-2 ml-auto">{actions}</div>}
      </div>

      {/* Table wrapper */}
      <div className="rounded-xl border border-border overflow-hidden">
        {loading ? (
          <SkeletonTable />
        ) : error ? (
          <div className="bg-surface">
            <EmptyState type="error" action={onRetry} actionLabel="Retry" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="bg-surface">
            <EmptyState
              type={query ? 'search' : 'empty'}
              title={emptyTitle}
              message={emptyMessage}
            />
            {query && <button className="empty-clear-button" onClick={() => { setQuery(''); setPage(1) }}>Clear filters</button>}
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-max bg-surface">
              <thead>
                <tr className="border-b border-border bg-bg-tertiary">
                  {columns.map((col, i) => (
                    <th
                      key={col.key}
                      style={col.width ? { width: col.width } : undefined}
                      className={clsx(
                        'px-4 py-3 text-left text-xs font-semibold text-text-tertiary uppercase tracking-wide whitespace-nowrap',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center',
                        col.sortable && 'cursor-pointer select-none hover:text-text-primary transition-colors',
                        stickyFirstCol && i === 0 && 'sticky left-0 bg-bg-tertiary z-10'
                      )}
                      onClick={col.sortable ? () => handleSort(col.key) : undefined}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.sortable && (
                          <SortIcon sortKey={sortKey} colKey={col.key} sortDir={sortDir} />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, ri) => (
                  <tr
                    key={row[rowKey] || ri}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={clsx(
                      'border-b border-border/50 last:border-0',
                      'transition-colors',
                      onRowClick && 'cursor-pointer hover:bg-bg-tertiary',
                      !onRowClick && 'hover:bg-bg-secondary/40'
                    )}
                  >
                    {columns.map((col, ci) => (
                      <td
                        key={col.key}
                        className={clsx(
                          'px-4 py-3 text-sm text-text-primary',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          stickyFirstCol && ci === 0 && 'sticky left-0 bg-surface'
                        )}
                      >
                        {renderCell(col, row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && paginated.length > 0 && <div className="mobile-data-cards">
        {paginated.map((row, ri) => <article key={row[rowKey] || ri} className={clsx('mobile-data-card', onRowClick && 'cursor-pointer')} onClick={onRowClick ? () => onRowClick(row) : undefined}>
          <div className="flex-1 min-w-0">{(mobileCard || columns.filter(col => col.key !== '_actions').slice(0, 3)).map(col => <div key={col.key} className="mobile-data-field"><span className="text-xs text-text-tertiary">{col.label}</span><span className="text-sm text-text-primary text-right">{renderCell(col, row)}</span></div>)}</div>
          {columns.find(col => col.key === '_actions')?.render?.(null, row)}
        </article>)}
      </div>}

      {/* Footer */}
      {!loading && !error && sorted.length > 0 && (
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1) }}
              className="bg-transparent border border-border rounded px-1.5 py-0.5 text-xs text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {PAGE_SIZE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <Pagination
            page={safePage}
            pageCount={pageCount}
            pageSize={pageSize}
            totalCount={sorted.length}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  )
}

function SkeletonTable() {
  return <div className="w-full p-4 space-y-4 bg-surface"><div className="skeleton h-4 w-1/3" />{Array.from({ length: 6 }).map((_, index) => <div key={index} className="flex gap-4 items-center"><div className="skeleton h-9 w-9 rounded-lg" /><div className="skeleton h-4 flex-1" /><div className="skeleton h-4 w-1/4" /><div className="skeleton h-4 w-1/6" /></div>)}</div>
}

function SortIcon({ sortKey, colKey, sortDir }) {
  if (sortKey !== colKey) return <ChevronsUpDown size={12} className="text-text-disabled" />
  return sortDir === 'asc'
    ? <ChevronUp size={12} className="text-accent" />
    : <ChevronDown size={12} className="text-accent" />
}
