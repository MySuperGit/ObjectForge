import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import './i18n'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import BackTop from './components/BackTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import Plaza from './pages/Plaza'
import Reviews from './pages/Reviews'
import Pricing from './pages/Pricing'
import FeatureDetail from './pages/FeatureDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <div className="pt-16 grid grid-cols-[280px_1fr] gap-4 max-w-7xl mx-auto px-4">
            <Sidebar />
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
