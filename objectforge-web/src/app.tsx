import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import './i18n'

export default function App() {
  useEffect(() => {
    // placeholder for language toast etc.
  }, [])

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plaza" element={<Plaza />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
        <BackTop />
      </BrowserRouter>
    </Suspense>
  )
}

