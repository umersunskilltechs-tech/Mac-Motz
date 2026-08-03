import { useEffect, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'motion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Series from './pages/Series'
import About from './pages/About'
import Contact from './pages/Contact'

const PRELOADER_DURATION_MS = 900

function Shell({ children }) {
  const reduce = useReducedMotion()
  const [loading, setLoading] = useState(!reduce)

  useEffect(() => {
    if (reduce) return
    const timer = window.setTimeout(() => setLoading(false), PRELOADER_DURATION_MS)
    return () => window.clearTimeout(timer)
  }, [reduce])

  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-accent selection:text-ink">
      <AnimatePresence>{loading && <Preloader durationMs={PRELOADER_DURATION_MS} />}</AnimatePresence>
      <Header />
      {children}
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:series" element={<Series />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
