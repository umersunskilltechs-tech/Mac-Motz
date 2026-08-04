import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const SPRING = { stiffness: 380, damping: 32, mass: 0.5 }

// Only photographs and the draggable lightbox image get a centre label. Over
// links the label would land on top of the link's own text and both become
// unreadable, so the centre mark simply grows instead.
const LABELS = { view: 'View', drag: 'Drag ↔' }

// Camera-viewfinder cursor: a focus box of four corner brackets that trails the
// pointer, with a centre mark that becomes a label over anything interactive —
// the centre is never empty. Normally drawn in difference blend so it stays
// legible on the pale page and over dark photographs; on press it drops to
// normal blend and fires in the accent orange, like a shutter.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState('default')
  const [pressed, setPressed] = useState(false)

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
      else if (target.closest?.('[data-cursor="drag"]')) setMode('drag')
      else if (target.closest?.('[data-cursor="view"]')) setMode('view')
      else if (target.closest?.('a, button, [role="button"]')) setMode('link')
      else setMode('default')
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => {
      setVisible(false)
      setPressed(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null

  const showCursor = visible && mode !== 'text'
  const label = LABELS[mode] ?? null
  const baseScale = mode === 'view' ? 1.9 : mode === 'drag' ? 2.1 : mode === 'link' ? 1.4 : 1
  const boxScale = pressed ? baseScale * 1.22 : baseScale
  // Kept modest and round: a large filled mark sitting on a text link reads as
  // a redaction block rather than a cursor.
  const markScale = label ? 0 : pressed ? 2.2 : mode === 'link' ? 1.5 : 1

  const strokeClass = pressed ? 'border-accent' : 'border-white/80'
  const fillClass = pressed ? 'bg-accent' : 'bg-white'
  const textClass = pressed ? 'text-accent' : 'text-white'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-1000"
      style={{
        opacity: showCursor ? 1 : 0,
        // Difference blend guarantees contrast everywhere, but it also means a
        // real colour is impossible — so the press state opts out of it.
        mixBlendMode: pressed ? 'normal' : 'difference',
        transition: 'opacity 200ms ease',
      }}
    >
      <motion.div style={{ x: boxX, y: boxY }} className="absolute left-0 top-0 will-change-transform">
        <motion.div
          animate={{ scale: boxScale }}
          transition={{ type: 'spring', stiffness: 520, damping: 26, mass: 0.5 }}
          className="relative h-10 w-10 -translate-x-1/2 -translate-y-1/2"
        >
          <span className={`absolute left-0 top-0 h-2.5 w-2.5 border-l border-t ${strokeClass}`} />
          <span className={`absolute right-0 top-0 h-2.5 w-2.5 border-r border-t ${strokeClass}`} />
          <span className={`absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l ${strokeClass}`} />
          <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r ${strokeClass}`} />
        </motion.div>

        {/* Label sits dead centre and stays unscaled so it never distorts. */}
        <motion.span
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
          className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[7px] uppercase tracking-[.24em] ${textClass}`}
        >
          {label ?? LABELS.view}
        </motion.span>
      </motion.div>

      {/* Centre mark tracks the pointer exactly. It steps aside only when the
          label is occupying the same spot, so the centre is never blank. */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0 will-change-transform">
        <motion.div
          animate={{ scale: markScale }}
          transition={{ type: 'spring', stiffness: 520, damping: 24 }}
          className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${fillClass}`}
        />
      </motion.div>
    </div>
  )
}
