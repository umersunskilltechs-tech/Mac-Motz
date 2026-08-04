import { motion } from 'motion/react'
import { easeOut } from '../motion'

export default function Masthead({ firstCollection, collectionCount, frameCount }) {
  return (
    <header id="top" className="px-5 pt-32 pb-16 md:px-10 md:pt-44 md:pb-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[.22em] text-sub">
        <span>Photography / Portfolio</span>
        <span>
          {collectionCount} collections &middot; {frameCount} frames
        </span>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
        className="mt-8 font-display text-[16vw] leading-[0.86] tracking-[-.06em] md:text-[11vw]"
      >
        Mac Motz
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: easeOut }}
        className="mt-10 grid gap-8 md:grid-cols-12"
      >
        <p className="font-display text-2xl leading-[1.15] tracking-[-.02em] md:col-span-7 md:text-4xl">
          Photographs about the distance between places &mdash; roads passed through, rooms emptied, and the people
          who stayed.
        </p>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-[15px] leading-relaxed text-ink/70">
            Work is organised by collection. Every collection is on this page in full &mdash; scroll it, or jump from
            the index below.
          </p>
          <a
            href={`#${firstCollection.id}`}
            className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[.2em] text-accent"
          >
            Scroll down: {firstCollection.title} &darr;
          </a>
        </div>
      </motion.div>
    </header>
  )
}
