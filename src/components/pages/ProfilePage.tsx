'use client'

import { User } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <User className="w-8 h-8 text-[hsl(245,58%,51%)]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <p className="text-gray-600">Your profile information and settings will appear here.</p>
      </div>
    </div>
  )
}
