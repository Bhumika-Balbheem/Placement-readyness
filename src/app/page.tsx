'use client'

import { useEffect, useState } from 'react'

// Loading component shown while app initializes
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-[hsl(245,58%,51%)]/30 border-t-[hsl(245,58%,51%)] rounded-full animate-spin" />
    </div>
  )
}

// Dynamically import the router component to avoid SSR issues
function App() {
  const [RouterComponent, setRouterComponent] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Dynamically import the router only on client side
    import('./AppRouter').then(mod => {
      setRouterComponent(() => mod.default)
    })
  }, [])

  if (!RouterComponent) {
    return <PageLoader />
  }

  return <RouterComponent />
}

export default function Home() {
  return <App />
}
