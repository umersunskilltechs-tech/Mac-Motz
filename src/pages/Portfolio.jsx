import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { allFrames, collections, framesByCollection } from '../data'
import Eyebrow from '../components/Eyebrow'
import ContactSheet from '../components/ContactSheet'
import Typewriter from '../components/Typewriter'
import Reveal from '../components/Reveal'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)

  const frames = useMemo(
    () => (filter === 'all' ? allFrames : framesByCollection[filter]),
    [filter],
  )
  const active = collections.find((collection) => collection.id === filter)

  return (
    <>
      <section className="px-5 pt-32 pb-16 md:px-10 md:pt-44">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
        </Reveal>
        <Typewriter
          as="h1"
          text="The archive"
          speed={80}
          delay={300}
          className="mt-5 block font-display text-[14vw] leading-[.84] tracking-[-.06em] md:text-[9vw]"
        />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/70">
            Every frame across every collection, as one contact sheet. Filter by collection, or open any frame to
            view it full size.
          </p>
        </Reveal>

        <Reveal delay={0.2} as="nav" className="mt-12 border-y border-ink/15 py-4">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] uppercase tracking-[.18em]">
            <li>
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`transition hover:text-accent ${filter === 'all' ? 'text-accent' : 'text-sub'}`}
              >
                <span className="tabular-nums">All</span> ({allFrames.length})
              </button>
            </li>
            {collections.map((collection) => (
              <li key={collection.id}>
                <button
                  type="button"
                  onClick={() => setFilter(collection.id)}
                  className={`transition hover:text-accent ${
                    filter === collection.id ? 'text-accent' : 'text-sub'
                  }`}
                >
                  <span className="tabular-nums opacity-60">{collection.number}</span> {collection.title}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-6 flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-[.18em] text-sub">
          <span aria-live="polite">
            Showing {frames.length} {frames.length === 1 ? 'frame' : 'frames'}
            {active ? ` / ${active.year} · ${active.location}` : ' / all collections'}
          </span>
        </div>

        <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-6">
          <ContactSheet frames={frames} onOpen={setOpenId} columns="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
        </motion.div>
      </section>

      <Footer />

      <AnimatePresence>
        {openId && <Lightbox frames={frames} startId={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}
