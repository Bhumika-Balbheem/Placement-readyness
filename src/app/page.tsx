'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamically import all pages to avoid SSR issues with react-router
const BrowserRouter = dynamic(
  () => import('react-router-dom').then(mod => mod.BrowserRouter),
  { ssr: false }
)
const Routes = dynamic(
  () => import('react-router-dom').then(mod => mod.Routes),
  { ssr: false }
)
const Route = dynamic(
  () => import('react-router-dom').then(mod => mod.Route),
  { ssr: false }
)

const LandingPage = dynamic(() => import('@/components/pages/LandingPage'), { ssr: false })
const DashboardShell = dynamic(() => import('@/components/dashboard/DashboardShell').then(mod => mod.DashboardShell), { ssr: false })
const DashboardPage = dynamic(() => import('@/components/pages/DashboardPage'), { ssr: false })
const PracticePage = dynamic(() => import('@/components/pages/PracticePage'), { ssr: false })
const AssessmentsPage = dynamic(() => import('@/components/pages/AssessmentsPage'), { ssr: false })
const ResultsPage = dynamic(() => import('@/components/pages/ResultsPage'), { ssr: false })
const HistoryPage = dynamic(() => import('@/components/pages/HistoryPage'), { ssr: false })
const ResourcesPage = dynamic(() => import('@/components/pages/ResourcesPage'), { ssr: false })
const ProfilePage = dynamic(() => import('@/components/pages/ProfilePage'), { ssr: false })
const TestChecklistPage = dynamic(() => import('@/components/pages/TestChecklistPage'), { ssr: false })
const ShipPage = dynamic(() => import('@/components/pages/ShipPage'), { ssr: false })

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/prp/07-test" element={<TestChecklistPage />} />
      <Route path="/prp/08-ship" element={<ShipPage />} />
    </Routes>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
    </div>}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Suspense>
  )
}
