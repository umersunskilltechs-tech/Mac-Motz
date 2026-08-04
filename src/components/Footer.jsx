import { Link } from 'react-router-dom'
import Eyebrow from './Eyebrow'

export default function Footer() {
  return (
    <section className="border-t border-ink/15 px-5 py-24 md:px-10 md:py-32">
      <Eyebrow>Inquiries</Eyebrow>
      <Link
        to="/contact"
        className="mt-6 block font-display text-[13vw] leading-[.86] tracking-[-.05em] transition-colors hover:text-accent md:text-[9vw]"
      >
        Start a conversation <span className="text-accent">&rarr;</span>
      </Link>

      <footer className="mt-24 grid gap-8 border-t border-ink/15 pt-6 font-mono text-[10px] uppercase tracking-[.18em] text-sub md:grid-cols-4">
        <p className="text-ink">
          Passing through
          <br />
          Staying a while
          <br />
          Making pictures
        </p>
        <p>
          Kentucky, USA
          <br />
          Available worldwide
        </p>
        <p className="flex flex-col gap-1">
          <a href="https://www.instagram.com/" className="transition hover:text-accent">
            Instagram
          </a>
          <a href="mailto:hello@macmotz.com" className="transition hover:text-accent">
            hello@macmotz.com
          </a>
        </p>
        <p className="md:text-right">
          MM &copy; 2026
          <br />
          All rights reserved
        </p>
      </footer>
    </section>
  )
}
