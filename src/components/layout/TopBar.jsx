import React, { useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Sun, Moon, Bell, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../context/NotificationContext'
import { formatRelativeTime } from '../../utils/formatters'
import { Badge } from '../ui/Badge'

const routeLabels = {
  '/': 'Dashboard',
  '/users': 'User Management',
  '/products': 'Product Management',
  '/orders': 'Order Management',
  '/categories': 'Category Management',
  '/analytics': 'Analytics',
  '/notifications': 'Notifications',
  '/cms': 'Content Management',
  '/roles': 'Roles & Permissions',
  '/settings': 'Settings',
}

function getPageTitle(pathname) {
  const base = '/' + pathname.split('/').filter(Boolean)[0]
  return routeLabels[base] || routeLabels[pathname] || 'Meridian'
}

function NotificationDropdown({ open, onClose, notifications, markRead, markAllRead }) {
  const unread = notifications.filter(n => !n.read)
  const recent = notifications.slice(0, 8)

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 top-10 z-40 w-96 rounded-xl border border-border bg-surface shadow-modal animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
            <p className="text-xs text-text-tertiary">{unread.length} unread</p>
          </div>
          {unread.length > 0 && (
            <button onClick={markAllRead} className="text-xs text-accent hover:text-accent-hover font-medium transition-colors">
              Mark all read
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {recent.length === 0 ? (
            <p className="text-sm text-text-tertiary text-center py-8">All caught up!</p>
          ) : recent.map(n => (
            <div
              key={n.id}
              onClick={() => markRead(n.id)}
              className={clsx(
                'flex gap-3 p-4 border-b border-border/50 last:border-0 cursor-pointer transition-colors hover:bg-bg-tertiary',
                !n.read && 'bg-accent-subtle/30'
              )}
            >
              <div className={clsx('mt-0.5 w-2 h-2 rounded-full shrink-0 mt-1.5', n.read ? 'bg-transparent' : 'bg-accent')} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-text-primary">{n.category}</p>
                <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-2xs text-text-tertiary mt-1">{formatRelativeTime(n.time)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border text-center">
          <Link to="/notifications" onClick={onClose} className="text-xs text-accent hover:text-accent-hover font-medium transition-colors">
            View all notifications →
          </Link>
        </div>
      </div>
    </>
  )
}

function Avatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
      <span className="text-xs font-bold text-accent">AP</span>
    </div>
  )
}

export function TopBar({ onMenuClick }) {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()
  const [notifOpen, setNotifOpen] = useState(false)

  const title = getPageTitle(pathname)

  return (
    <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
        >
          <Menu size={20} />
        </button>
        <span className="mobile-wordmark lg:hidden text-xs font-bold tracking-[0.12em] uppercase text-text-primary">Meridian</span>
        <h1 className="text-base font-semibold text-text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-raised transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(o => !o)}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
            className="relative p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-raised transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 rounded-full bg-danger text-white text-2xs font-bold flex items-center justify-center px-0.5">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            open={notifOpen}
            onClose={() => setNotifOpen(false)}
            notifications={notifications}
            markRead={markRead}
            markAllRead={markAllRead}
          />
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
          <Avatar />
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-text-primary leading-none">Aria Chen</p>
            <p className="text-2xs text-text-tertiary leading-none mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
