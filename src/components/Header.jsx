import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const mobileLinks = [...links, { to: 'mailto:hello@macmotz.com', label: 'hello@macmotz.com', external: true }]

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
        <Link to="/" onClick={() => setOpen(false)} className="font-mono text-sm font-bold uppercase tracking-[.22em]">
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
          className={`font-mono text-[10px] uppercase tracking-[.18em] md:hidden ${open ? 'invisible' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
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
            className="fixed inset-0 z-60 grid place-content-center bg-page px-5"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[.18em]"
            >
              Close
            </button>
            <div className="flex w-[min(80vw,280px)] flex-col gap-8">
              {mobileLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center text-center transition-colors hover:text-accent"
                  >
                    <span className="font-display text-[1.15rem] leading-none tracking-[-.02em]">{link.label}</span>
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-center transition-colors hover:text-accent ${
                        isActive ? 'text-accent' : ''
                      }`
                    }
                  >
                    <span className="font-display text-[1.6rem] leading-none tracking-[-.02em]">{link.label}</span>
                  </NavLink>
                ),
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
