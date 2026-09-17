import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { motion } from 'motion/react'
import {
  LayoutDashboard, Users, Package, ShoppingBag, Tag,
  BarChart3, Bell, FileText, Shield, Settings,
  ChevronLeft, ChevronRight, X,
} from 'lucide-react'

const navItems = [
  { section: 'Overview', items: [{ path: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true }] },
  { section: 'Management', items: [{ path: '/users', label: 'Users', icon: Users }, { path: '/products', label: 'Products', icon: Package }, { path: '/orders', label: 'Orders', icon: ShoppingBag }, { path: '/categories', label: 'Categories', icon: Tag }] },
  { section: 'Insights', items: [{ path: '/analytics', label: 'Analytics', icon: BarChart3 }] },
  { section: 'System', items: [{ path: '/notifications', label: 'Notifications', icon: Bell }, { path: '/cms', label: 'Content', icon: FileText }, { path: '/roles', label: 'Roles', icon: Shield }, { path: '/settings', label: 'Settings', icon: Settings }] },
]

// Meridian Logo SVG
function MeridianLogo({ collapsed }) {
  return (
    <div className="flex items-center gap-2.5 px-4 h-16 border-b border-sidebar-border shrink-0">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <circle cx="14" cy="14" r="12" stroke="var(--accent)" strokeWidth="2"/>
        <line x1="4" y1="24" x2="24" y2="4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="14" cy="14" r="3" fill="var(--accent)" />
      </svg>
      {!collapsed && (
        <span className="text-sm font-bold tracking-[0.12em] text-text-primary uppercase select-none">
          Meridian
        </span>
      )}
    </div>
  )
}

function NavItem({ item, collapsed }) {
  const location = useLocation()
  const isActive = item.exact
    ? location.pathname === item.path
    : location.pathname.startsWith(item.path)

  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={clsx(
        'nav-item flex items-center gap-3 rounded-xl transition-all duration-150 group relative',
        collapsed ? 'justify-center p-2.5 mx-2' : 'px-3 py-2.5 mx-2',
        isActive
          ? 'bg-sidebar-item-active text-sidebar-text-active'
          : 'text-sidebar-text hover:bg-sidebar-item-hover hover:text-text-primary'
      )}
    >
      <item.icon
        size={18}
        className={clsx('nav-icon shrink-0 transition-colors', isActive ? 'text-accent' : '')}
        strokeWidth={isActive ? 2.5 : 2}
      />
      {!collapsed && (
        <span className={clsx('text-sm font-medium', isActive && 'font-semibold')}>
          {item.label}
        </span>
      )}
      {isActive && !collapsed && (
        <motion.span layoutId="meridian-active-nav" className="nav-active-dot ml-auto w-1.5 h-1.5 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />
      )}
      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-surface-overlay border border-border text-xs font-medium text-text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-elevated z-50">
          {item.label}
        </span>
      )}
    </NavLink>
  )
}

// Mobile Drawer Sidebar
export function MobileDrawer({ open, onClose }) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed left-0 top-0 bottom-0 z-50 w-64 flex flex-col bg-sidebar-bg border-r border-sidebar-border shadow-modal animate-slide-in-right" style={{ animationDirection: 'normal' }}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="var(--accent)" strokeWidth="2"/>
              <line x1="4" y1="24" x2="24" y2="4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="3" fill="var(--accent)" />
            </svg>
            <span className="text-sm font-bold tracking-[0.12em] text-text-primary uppercase">Meridian</span>
          </div>
          <button onClick={onClose} aria-label="Close navigation" className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-raised">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5">
          {navItems.map(group => <div key={group.section} className="mb-3"><p className="px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-text-disabled">{group.section}</p>{group.items.map(item => <div key={item.path} onClick={onClose}><NavItem item={item} collapsed={false} /></div>)}</div>)}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-2xs text-text-disabled uppercase tracking-wider">v1.0.0 — Electronics Ops</p>
        </div>
      </aside>
    </>
  )
}

export function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={clsx(
        'hidden lg:flex flex-col bg-sidebar-bg border-r border-sidebar-border transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-[72px]' : 'w-60'
      )}
    >
      <MeridianLogo collapsed={collapsed} />
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5">
        {navItems.map(group => <div key={group.section} className="mb-3"><p className={clsx('px-5 py-2 text-[10px] font-semibold uppercase tracking-widest text-text-disabled', collapsed && 'sr-only')}>{group.section}</p>{group.items.map(item => <NavItem key={item.path} item={item} collapsed={collapsed} />)}</div>)}
      </nav>
      {/* Footer + collapse toggle */}
      <div className={clsx('border-t border-sidebar-border py-3', collapsed ? 'flex justify-center' : 'px-2')}>
        <button
          onClick={onToggle}
          className="flex items-center gap-2 p-2 rounded-xl text-sidebar-text hover:text-text-primary hover:bg-sidebar-item-hover transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
