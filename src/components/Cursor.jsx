import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const SPRING = { stiffness: 380, damping: 32, mass: 0.5 }

// Camera-viewfinder cursor: a focus box of four corner brackets that trails the
// pointer, plus a hard centre mark that tracks exactly. Rendered in difference
// blend so it stays legible on the pale page and over dark photographs.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const boxX = useSpring(x, SPRING)
  const boxY = useSpring(y, SPRING)

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
  const boxScale = mode === 'view' ? 1.9 : mode === 'link' ? 1.35 : 1
  const corner = 'absolute h-2.5 w-2.5 border-white/80'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-1000 mix-blend-difference"
      style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 200ms ease' }}
    >
      <motion.div style={{ x: boxX, y: boxY }} className="absolute left-0 top-0 will-change-transform">
        <motion.div
          animate={{ scale: boxScale }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-10 w-10 -translate-x-1/2 -translate-y-1/2"
        >
          <span className={`${corner} left-0 top-0 border-l border-t`} />
          <span className={`${corner} right-0 top-0 border-r border-t`} />
          <span className={`${corner} bottom-0 left-0 border-b border-l`} />
          <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        </motion.div>

        <motion.span
          animate={{ opacity: mode === 'view' ? 1 : 0, y: mode === 'view' ? 0 : -4 }}
          transition={{ duration: 0.22 }}
          className="absolute left-0 top-7 -translate-x-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[.28em] text-white"
        >
          View
        </motion.span>
      </motion.div>

      <motion.div style={{ x, y }} className="absolute left-0 top-0 will-change-transform">
        <motion.div
          animate={{ scale: mode === 'default' ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-white"
        />
      </motion.div>
    </div>
  )
}
