import { motion } from 'motion/react'
import Typewriter from './Typewriter'
import Reveal from './Reveal'
import { easeOut } from '../motion'

export default function Masthead({ collections, frameCount }) {
  const first = collections[0]

  return (
    <header id="top" className="px-5 pt-32 pb-16 md:px-10 md:pt-44 md:pb-20">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[.22em] text-sub">
        <span>Photography / Portfolio</span>
        <span>
          {collections.length} collections &middot; {frameCount} frames
        </span>
      </Reveal>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
      >
        <Typewriter
          as="h1"
          text="Mac Motz"
          speed={95}
          delay={400}
          className="mt-8 block font-display text-[16vw] leading-[0.86] tracking-[-.06em] md:text-[11vw]"
        />
      </motion.div>

      <div className="mt-10 grid gap-8 md:grid-cols-12">
        <Reveal delay={0.15} className="md:col-span-7">
          <p className="font-display text-2xl leading-[1.15] tracking-[-.02em] md:text-4xl">
            Photographs about the distance between places &mdash; roads passed through, rooms emptied, and the
            people who stayed.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="md:col-span-4 md:col-start-9">
          <p className="text-[15px] leading-relaxed text-ink/70">
            Work is organised by collection. Every collection is on this page in full &mdash; scroll it, or jump
            from the index.
          </p>
          <a
            href={`#${first.id}`}
            className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[.2em] text-accent"
          >
            Scroll down: {first.title} &darr;
          </a>
        </Reveal>
      </div>

      {/* The fixed archive rail is desktop-only, so small screens get the same
          jump-links inline instead. */}
      <Reveal delay={0.3} className="mt-12 lg:hidden">
        <p className="font-mono text-[9px] uppercase tracking-[.22em] text-sub">Archive</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
          {collections.map((collection) => (
            <li key={collection.id}>
              <a
                href={`#${collection.id}`}
                className="font-mono text-[10px] uppercase tracking-[.16em] text-sub transition hover:text-accent"
              >
                <span className="text-accent">{collection.number}</span> {collection.title}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </header>
  )
}
