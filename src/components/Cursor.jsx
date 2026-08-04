import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const SPRING = { stiffness: 380, damping: 32, mass: 0.5 }

// Editorial two-part cursor: a hard dot that tracks exactly, and a ring that
// trails behind and swells over anything interactive. Rendered in difference
// blend so it stays legible on the pale page and on top of dark photographs.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, SPRING)
  const ringY = useSpring(y, SPRING)

  useEffect(() => {
    // Pointer-driven only: never render for touch, stylus, or reduced motion.
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined
    setEnabled(true)

    const onMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }

    const onOver = (event) => {
      const target = event.target
      if (target.closest?.('input, textarea, select')) setMode('text')
      else if (target.closest?.('[data-cursor="view"]')) setMode('view')
      else if (target.closest?.('a, button, [role="button"]')) setMode('link')
      else setMode('default')
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  const showCursor = visible && mode !== 'text'
  const ringScale = mode === 'view' ? 2.6 : mode === 'link' ? 1.7 : 1

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-1000 mix-blend-difference"
      style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 200ms ease' }}
    >
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0 will-change-transform"
      >
        <motion.div
          animate={{ scale: ringScale }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70"
        >
          <motion.span
            animate={{ opacity: mode === 'view' ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-[5px] uppercase tracking-[.2em] text-white"
          >
            View
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 will-change-transform"
      >
        <motion.div
          animate={{ scale: mode === 'default' ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      </motion.div>
    </div>
  )
}
