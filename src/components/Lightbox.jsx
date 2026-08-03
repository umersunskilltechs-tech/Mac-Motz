import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

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
          className="text-paper transition hover:text-accent"
        >
          Close &times;
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-3 pb-4" onClick={stop}>
        <button
          type="button"
          onClick={previous}
          aria-label="Previous image"
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 p-3 text-2xl text-paper/70 transition hover:text-accent md:left-4"
        >
          &larr;
        </button>
        <AnimatePresence mode="wait">
          <motion.img
            key={active.id}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            src={active.src}
            alt={active.alt}
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />
        </AnimatePresence>
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 p-3 text-2xl text-paper/70 transition hover:text-accent md:right-4"
        >
          &rarr;
        </button>
      </div>

      <p className="px-5 pb-6 text-center text-sm text-paper/70 md:px-10" onClick={stop}>
        {active.alt}
      </p>
    </motion.div>
  )
}
