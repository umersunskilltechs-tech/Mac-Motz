import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Series from './pages/Series'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-ink text-paper selection:bg-accent selection:text-ink">
        <Preloader />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:series" element={<Series />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
