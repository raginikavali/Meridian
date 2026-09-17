import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const labelMap = {
  '': 'Dashboard',
  users: 'Users',
  products: 'Products',
  orders: 'Orders',
  categories: 'Categories',
  analytics: 'Analytics',
  notifications: 'Notifications',
  cms: 'Content',
  roles: 'Roles & Permissions',
  settings: 'Settings',
}

export function Breadcrumbs() {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  if (parts.length === 0) return null // hide on dashboard

  const crumbs = parts.map((part, i) => ({
    label: labelMap[part] || part,
    path: '/' + parts.slice(0, i + 1).join('/'),
    isLast: i === parts.length - 1,
  }))

  return (
    <nav className="flex items-center gap-1 text-xs text-text-tertiary mb-4">
      <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
        <Home size={12} />
        <span>Dashboard</span>
      </Link>
      {crumbs.map(c => (
        <React.Fragment key={c.path}>
          <ChevronRight size={12} className="text-text-disabled" />
          <Link to={c.path} aria-current={c.isLast ? 'page' : undefined} className={c.isLast ? 'text-text-secondary font-medium' : 'hover:text-text-primary transition-colors'}>{c.label}</Link>
        </React.Fragment>
      ))}
    </nav>
  )
}
