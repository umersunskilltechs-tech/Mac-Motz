import { Link } from 'react-router-dom'
import Eyebrow from './Eyebrow'

export default function Footer() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <Eyebrow>Contact</Eyebrow>
      <Link to="/contact" className="mt-6 block font-display text-[13vw] leading-[.86] tracking-[-.05em] md:text-[9vw]">
        Start a conversation <span className="text-accent">&rarr;</span>
      </Link>
      <footer className="mt-28 flex flex-col justify-between gap-4 border-t border-paper/20 pt-5 font-mono text-[10px] uppercase tracking-[.15em] text-muted md:flex-row">
        <span>&copy; 2026 Mac Motz</span>
        <span>Photographer / USA</span>
        <a href="mailto:hello@macmotz.com" className="hover:text-accent">
          hello@macmotz.com
        </a>
      </footer>
    </section>
  )
}
