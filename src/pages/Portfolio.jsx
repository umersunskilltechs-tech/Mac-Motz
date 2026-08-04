import { useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { allFrames, collections } from '../data'
import Eyebrow from '../components/Eyebrow'
import ContactSheet from '../components/ContactSheet'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState(null)

  const frames = useMemo(
    () => (filter === 'all' ? allFrames : allFrames.filter((frame) => frame.collection.id === filter)),
    [filter],
  )

  return (
    <>
      <section className="px-5 pt-32 pb-16 md:px-10 md:pt-44">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="mt-5 font-display text-[14vw] leading-[.84] tracking-[-.06em] md:text-[9vw]">The archive</h1>
        <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/70">
          Every frame across every collection, as one contact sheet. Filter by collection, or open any frame to view
          it full size.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-ink/15 py-4 font-mono text-[10px] uppercase tracking-[.18em]">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`transition hover:text-accent ${filter === 'all' ? 'text-accent' : 'text-sub'}`}
          >
            All ({allFrames.length})
          </button>
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => setFilter(collection.id)}
              className={`transition hover:text-accent ${filter === collection.id ? 'text-accent' : 'text-sub'}`}
            >
              {collection.title}
            </button>
          ))}
        </div>

        <div className="mt-10">
          <ContactSheet frames={frames} onOpen={setOpenId} columns="grid-cols-2 md:grid-cols-4 lg:grid-cols-5" />
        </div>
      </section>

      <Footer />

      <AnimatePresence>
        {openId && <Lightbox frames={frames} startId={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}
