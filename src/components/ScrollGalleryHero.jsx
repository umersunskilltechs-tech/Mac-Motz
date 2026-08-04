import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import Eyebrow from './Eyebrow'

// Sticky pinned hero: the container is N viewports tall, the inner panel
// stays pinned via position:sticky, and normal page scroll (no wheel capture)
// drives which collection is active. Scrolling never gets trapped — it always
// continues past the hero once its height is exhausted.
export default function ScrollGalleryHero({ collections }) {
  const containerRef = useRef(null)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const next = Math.min(Math.floor(latest * collections.length), collections.length - 1)
      setActive((current) => (current === next ? current : Math.max(0, next)))
    })
    return unsubscribe
  }, [scrollYProgress, collections.length])

  function goTo(index) {
    const node = containerRef.current
    if (!node) return
    const top = node.offsetTop + (index / collections.length) * node.offsetHeight
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }

  const current = collections[active]

  return (
    <section ref={containerRef} style={{ height: `${collections.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.id}
            src={current.cover}
            alt={`${current.title}, ${current.location}`}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.99 }}
            transition={{ duration: reduce ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/15 to-ink/95" />

        <div className="relative flex h-full flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pb-14">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[.18em] text-paper/75">
            <span>Mac Motz / Photographer</span>
            <span aria-live="polite">
              {String(active + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}
            </span>
          </div>

          <div className="flex items-end justify-between gap-8">
            <div className="max-w-2xl">
              <Eyebrow>
                {current.number} / {current.year}
              </Eyebrow>
              <motion.h1
                key={current.id}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 font-display text-6xl leading-[.9] tracking-[-.05em] md:text-8xl"
              >
                {current.title}
              </motion.h1>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[.16em] text-muted">{current.location}</p>
            </div>

            <div className="hidden flex-col gap-3 md:flex" role="group" aria-label="Jump to collection">
              {collections.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Jump to ${item.title}`}
                  aria-current={index === active}
                  className={`h-14 w-11 overflow-hidden rounded-sm border transition ${
                    index === active ? 'border-accent opacity-100' : 'border-paper/30 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={item.cover} alt="" aria-hidden="true" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/25 pt-4 font-mono text-[10px] uppercase tracking-[.18em] text-paper/70">
            <span>Scroll to explore</span>
            <Link to={`/portfolio/${current.id}`} className="hover:text-accent">
              Open {current.title} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
