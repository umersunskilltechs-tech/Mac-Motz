import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

function AnimatedStat({ value, label, index }) {
  const ref = useRef(null)
  const frame = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.65 })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }

    const duration = 1100
    const delay = index * 90
    let start
    function tick(time) {
      if (start == null) start = time + delay
      if (time < start) {
        frame.current = requestAnimationFrame(tick)
        return
      }
      const progress = Math.min(1, (time - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(value * eased))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => frame.current && cancelAnimationFrame(frame.current)
  }, [inView, index, reduce, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="border-paper/20 px-5 py-10 even:border-l md:border-l md:px-8 md:py-14 md:first:border-l-0"
    >
      <p className="font-display text-5xl tabular-nums tracking-[-.05em] text-paper md:text-7xl">
        {String(display).padStart(2, '0')}
      </p>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[.16em] text-muted">{label}</p>
    </motion.div>
  )
}

export default function StatsBand({ collections, totalFrames, className = '' }) {
  const years = collections.map((item) => Number(item.year)).filter(Boolean)
  const stats = [
    [collections.length, 'Photographic series'],
    [totalFrames, 'Frames in the archive'],
    [Math.max(...years) - Math.min(...years) + 1, 'Years represented'],
    [new Set(collections.map((item) => item.location)).size, 'Places documented'],
  ]

  return (
    <section className={`border-y border-paper/20 ${className}`} aria-label="Archive statistics">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map(([value, label], index) => (
          <AnimatedStat key={label} value={value} label={label} index={index} />
        ))}
      </div>
    </section>
  )
}
