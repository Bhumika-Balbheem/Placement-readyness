'use client'

import { useNavigate } from 'react-router-dom'
import { Code, Video, BarChart3 } from 'lucide-react'

export function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve coding challenges across multiple difficulty levels and topics.',
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with timed practice sessions.',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and insights.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:py-32 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Ace Your Placement
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Practice, assess, and prepare for your dream job
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[hsl(245,58%,51%)] rounded-lg hover:bg-[hsl(245,58%,45%)] transition-colors duration-200 shadow-lg shadow-indigo-200"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 mb-5">
                  <feature.icon className="w-6 h-6 text-[hsl(245,58%,51%)]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
