import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import CoverflowCarousel from './CoverflowCarousel'

export default function Lightbox({ frames, startId, onClose }) {
  const [index, setIndex] = useState(() => Math.max(0, frames.findIndex((f) => f.id === startId)))
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  const active = frames[index]

  const previous = () => setIndex((n) => (n - 1 + frames.length) % frames.length)
  const next = () => setIndex((n) => (n + 1) % frames.length)

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
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [frames.length, onClose])

  if (!active) return null

  const stop = (event) => event.stopPropagation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
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
        <span aria-live="polite">
          {index + 1} &mdash; {frames.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition hover:border-paper hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-3 pb-4" onClick={stop}>
        <div className="h-[72vh] w-full">
          <CoverflowCarousel frames={frames} activeIndex={index} onChange={setIndex} reduce={reduce} />
        </div>
      </div>

      <p className="px-5 pb-6 text-center text-sm text-paper/70 md:px-10" onClick={stop}>
        {active.alt}
      </p>
    </motion.div>
  )
}
