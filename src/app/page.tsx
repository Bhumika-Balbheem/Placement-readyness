'use client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { DashboardPage } from '@/pages/DashboardPage'
import { PracticePage } from '@/pages/PracticePage'
import { AssessmentsPage } from '@/pages/AssessmentsPage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { ProfilePage } from '@/pages/ProfilePage'

export default function Home() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="assessments" element={<AssessmentsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
