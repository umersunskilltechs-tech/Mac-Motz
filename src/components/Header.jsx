import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 transition-colors duration-500 md:px-10 ${
          scrolled ? 'border-b border-ink/12 bg-page/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <Link to="/" onClick={() => setOpen(false)} className="font-mono text-[11px] uppercase tracking-[.22em]">
          Mac Motz
        </Link>
        <nav className="hidden gap-8 font-mono text-[10px] uppercase tracking-[.18em] md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `transition hover:text-accent ${isActive ? 'text-accent' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <a href="mailto:hello@macmotz.com" className="text-sub transition hover:text-accent">
            hello@macmotz.com
          </a>
        </nav>
        <button
          type="button"
          className="font-mono text-[10px] uppercase tracking-[.18em] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 grid place-content-center gap-8 bg-page text-center"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="font-display text-5xl tracking-[-.03em] hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:hello@macmotz.com"
              className="font-mono text-[10px] uppercase tracking-[.2em] text-sub"
            >
              hello@macmotz.com
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
