import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const ADVANCE_MS = 4200

// The lead slideshow that opens every collection block: one large frame at a
// time, crossfading, with arrows and a counter. Pauses while hovered or focused.
export default function LeadSlider({ frames, onOpen }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const active = frames[index]

  const go = (step) => setIndex((n) => (n + step + frames.length) % frames.length)

  useEffect(() => {
    if (paused || reduce || frames.length < 2) return undefined
    const timer = window.setInterval(() => setIndex((n) => (n + 1) % frames.length), ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [paused, reduce, frames.length])

  return (
    <figure
      className="group relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(active.id)}
        aria-label={`Open ${active.alt} at full size`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-ink/5 md:aspect-[5/4]"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={active.id}
            src={active.src}
            alt={active.alt}
            loading="lazy"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </button>

      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.18em] text-sub">
        <figcaption className="truncate">
          {active.frame} &mdash; {active.alt}
        </figcaption>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous frame"
            className="transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            &larr;
          </button>
          <span className="tabular-nums text-ink">
            {String(index + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next frame"
            className="transition hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            &rarr;
          </button>
        </div>
      </div>
    </figure>
  )
}
