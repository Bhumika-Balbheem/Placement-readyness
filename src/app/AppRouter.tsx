'use client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Lazy load page components
const LandingPage = lazy(() => import('@/components/pages/LandingPage'))
const DashboardShell = lazy(() => import('@/components/dashboard/DashboardShell').then(mod => ({ default: mod.DashboardShell })))
const DashboardPage = lazy(() => import('@/components/pages/DashboardPage'))
const PracticePage = lazy(() => import('@/components/pages/PracticePage'))
const AssessmentsPage = lazy(() => import('@/components/pages/AssessmentsPage'))
const ResultsPage = lazy(() => import('@/components/pages/ResultsPage'))
const HistoryPage = lazy(() => import('@/components/pages/HistoryPage'))
const ResourcesPage = lazy(() => import('@/components/pages/ResourcesPage'))
const ProfilePage = lazy(() => import('@/components/pages/ProfilePage'))
const TestChecklistPage = lazy(() => import('@/components/pages/TestChecklistPage'))
const ShipPage = lazy(() => import('@/components/pages/ShipPage'))

// Loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
    </div>
  )
}

// Wrapper to handle suspense for each route
function withSuspense(Component: React.ComponentType) {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    )
  }
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={withSuspense(LandingPage)()} />
        <Route path="/dashboard" element={withSuspense(DashboardShell)()}>
          <Route index element={withSuspense(DashboardPage)()} />
          <Route path="practice" element={withSuspense(PracticePage)()} />
          <Route path="assessments" element={withSuspense(AssessmentsPage)()} />
          <Route path="results" element={withSuspense(ResultsPage)()} />
          <Route path="history" element={withSuspense(HistoryPage)()} />
          <Route path="resources" element={withSuspense(ResourcesPage)()} />
          <Route path="profile" element={withSuspense(ProfilePage)()} />
        </Route>
        <Route path="/prp/07-test" element={withSuspense(TestChecklistPage)()} />
        <Route path="/prp/08-ship" element={withSuspense(ShipPage)()} />
      </Routes>
    </BrowserRouter>
  )
}
