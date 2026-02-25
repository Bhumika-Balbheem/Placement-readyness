'use client'

import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Code2, ClipboardCheck, BookOpen, User } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/dashboard/practice', label: 'Practice', icon: Code2 },
  { path: '/dashboard/assessments', label: 'Assessments', icon: ClipboardCheck },
  { path: '/dashboard/resources', label: 'Resources', icon: BookOpen },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
]

export function DashboardShell() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-[hsl(245,58%,51%)]">Placement Prep</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-[hsl(245,58%,51%)]/10 text-[hsl(245,58%,51%)]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-900">Placement Prep</h1>
          <div className="w-10 h-10 rounded-full bg-[hsl(245,58%,51%)]/10 flex items-center justify-center">
            <User className="w-5 h-5 text-[hsl(245,58%,51%)]" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
