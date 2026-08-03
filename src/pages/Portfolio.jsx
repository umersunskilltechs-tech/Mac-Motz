import { useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { collections, allFrames, totalFrameCount } from '../data'
import Eyebrow from '../components/Eyebrow'
import FrameGrid from '../components/FrameGrid'
import Lightbox from '../components/Lightbox'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(null)

  const visible = useMemo(
    () => (filter === 'All' ? allFrames : allFrames.filter((frame) => frame.collection.title === filter)),
    [filter],
  )

  return (
    <section className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <Eyebrow>Full contact sheet / {totalFrameCount} frames</Eyebrow>
      <h1 className="mt-5 font-display text-[15vw] leading-[.82] tracking-[-.06em] md:text-[10vw]">All work.</h1>
      <p className="mt-8 max-w-xl text-paper/70">
        Filter by series, or select a frame to view it larger. Every collection is also available as its own
        gallery.
      </p>
      <div
        role="group"
        aria-label="Filter by collection"
        className="mt-14 flex flex-wrap gap-x-5 gap-y-3 border-y border-paper/20 py-4 font-mono text-[10px] uppercase tracking-[.14em]"
      >
        {['All', ...collections.map((c) => c.title)].map((label) => (
          <button
            key={label}
            type="button"
            aria-pressed={filter === label}
            onClick={() => setFilter(label)}
            className={filter === label ? 'text-accent' : 'text-muted transition hover:text-paper'}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-12">
        <FrameGrid frames={visible} onOpen={setOpenId} showCollection={filter === 'All'} />
      </div>
      <AnimatePresence>
        {openId && <Lightbox frames={visible} startId={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  )
}
