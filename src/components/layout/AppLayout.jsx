import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar, MobileDrawer } from './Sidebar'
import { TopBar } from './TopBar'
import { Breadcrumbs } from './Breadcrumbs'
import { ToastContainer } from '../ui/Toast'

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary text-text-primary">
      {/* Desktop Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />

      {/* Mobile Drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1440px] mx-auto p-4 md:p-8">
            <Breadcrumbs />
            <div key={pathname} className="route-surface">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  )
}
