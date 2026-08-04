import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export default function Lightbox({ frames, startId, onClose }) {
  const [index, setIndex] = useState(() => Math.max(0, frames.findIndex((f) => f.id === startId)))
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  const active = frames[index]

  useEffect(() => {
    closeRef.current?.focus()
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setIndex((n) => (n - 1 + frames.length) % frames.length)
      if (event.key === 'ArrowRight') setIndex((n) => (n + 1) % frames.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [frames.length, onClose])

  if (!active) return null

  const stop = (event) => event.stopPropagation()
  const go = (step) => setIndex((n) => (n + step + frames.length) % frames.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      className="fixed inset-0 z-70 flex flex-col bg-ink/96 text-paper backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${active.collection.title} image viewer`}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-4 px-5 py-5 font-mono text-[10px] uppercase tracking-[.15em] text-muted md:px-10"
        onClick={stop}
      >
        <span>
          {active.collection.title} / {active.frame}
        </span>
        <span aria-live="polite" className="tabular-nums">
          {index + 1} &mdash; {frames.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 transition hover:border-paper hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-2" onClick={stop}>
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={active.id}
            src={active.src}
            alt={active.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="max-h-[74vh] max-w-full object-contain"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 px-4 py-6 font-mono text-lg transition hover:text-accent md:left-6"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-6 font-mono text-lg transition hover:text-accent md:right-6"
        >
          &rarr;
        </button>
      </div>

      <p className="px-5 pb-8 text-center text-sm text-paper/70 md:px-10" onClick={stop}>
        {active.alt}
      </p>
    </motion.div>
  )
}
