import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const DURATION_MS = 1250
const DELAY_MS = 180

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  const [hidden, setHidden] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setProgress(100)
      setComplete(true)
      return
    }

    const completionTimer = window.setTimeout(() => {
      setProgress(100)
      setComplete(true)
    }, DURATION_MS + DELAY_MS + 500)

    function tick(now) {
      if (startRef.current == null) startRef.current = now + DELAY_MS
      if (now < startRef.current) {
        rafRef.current = window.requestAnimationFrame(tick)
        return
      }

      const elapsed = Math.min(1, (now - startRef.current) / DURATION_MS)
      // Fast at first, then gently settles into 100.
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(Math.round(eased * 100))
      if (elapsed === 1) {
        window.setTimeout(() => setComplete(true), 160)
        return
      }
      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      window.clearTimeout(completionTimer)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (hidden) return null

  return (
    <motion.div
      className="fixed inset-0 z-100 overflow-hidden bg-ink text-paper"
      initial={false}
      animate={{ clipPath: complete ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' }}
      transition={{ duration: complete ? 0.8 : 0, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (!complete) return
        setHidden(true)
      }}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress} percent`}
    >
      <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[.22em] text-muted md:inset-x-10 md:top-8">
        <span>Photography / Portfolio</span>
        <span>Est. 2026</span>
      </div>

      <div className="flex h-full items-center px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: complete ? 0 : 1, y: complete ? -28 : 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div>
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[19vw] leading-none tracking-[-.065em] md:text-[15vw]"
            >
              MAC
            </motion.p>
          </div>
          <div className="text-right">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[19vw] leading-none tracking-[-.065em] text-accent md:text-[15vw]"
            >
              MOTZ
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-5 bottom-6 md:inset-x-10 md:bottom-9">
        <div className="mb-3 flex items-end justify-between font-mono uppercase tracking-[.18em]">
          <span className="text-[9px] text-muted">Loading visual archive</span>
          <span className="text-2xl tabular-nums text-paper md:text-3xl">{String(progress).padStart(3, '0')}</span>
        </div>
        <div className="h-px overflow-hidden bg-paper/20">
          <motion.div
            className="h-full origin-left bg-accent"
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
