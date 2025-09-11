import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BackTop from './components/BackTop'
import Footer from './components/Footer'
import { useUIStore } from './store/ui'
import Home from './pages/Home'
import Plaza from './pages/Plaza'
import Reviews from './pages/Reviews'
import Pricing from './pages/Pricing'
import FeatureDetail from './pages/FeatureDetail'
import NotFound from './pages/NotFound'
import './i18n'

export default function App() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div
            className={`pt-16 max-w-7xl mx-auto px-4 gap-4 grid ${
              sidebarOpen ? 'grid-cols-[280px_1fr]' : 'grid-cols-1'
            }`}
          >
            {sidebarOpen && <Sidebar />}
            <div id="main" className="min-h-[70vh]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plaza" element={<Plaza />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/features/:slug" element={<FeatureDetail />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
          </div>
          <Footer />
          <BackTop />
        </BrowserRouter>
      </QueryClientProvider>
    </Suspense>
  )
}

