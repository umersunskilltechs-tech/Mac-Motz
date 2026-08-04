import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'

export default function CollectionTabs({ collections }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const current = collections[active]

  return (
    <section className="px-5 py-20 md:px-10 md:py-28" aria-labelledby="collection-tabs-title">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-accent">Selected collections</p>
          <h2 id="collection-tabs-title" className="mt-3 font-display text-4xl tracking-[-.04em] md:text-6xl">
            Explore the archive.
          </h2>
        </div>
        <Link to="/portfolio" className="hidden font-mono text-[10px] uppercase tracking-[.16em] text-muted transition hover:text-paper sm:block">
          View all work &rarr;
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl bg-paper p-2 text-ink md:grid md:min-h-[520px] md:grid-cols-[360px_1fr]">
        <div className="flex flex-col md:py-8" role="tablist" aria-label="Photography collections">
          {collections.map((item, index) => {
            const selected = index === active
            return (
              <motion.button
                layout
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="collection-tab-panel"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                transition={{ type: 'spring', stiffness: 300, damping: 50 }}
                className={`relative rounded-xl px-5 py-4 text-left transition-colors md:rounded-r-none ${selected ? 'bg-[#dfe4e7]' : 'hover:bg-black/5'}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-2xl tracking-[-.025em] md:text-[28px]">{item.title}</span>
                  <span className="font-mono text-[9px] tracking-[.15em] text-ink/45">{item.number}</span>
                </div>
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 text-sm leading-relaxed text-ink/60">{item.description}</p>
                      <span className="mt-3 inline-block font-mono text-[9px] uppercase tracking-[.16em] text-accent">
                        View series &rarr;
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        <Link
          id="collection-tab-panel"
          role="tabpanel"
          to={`/portfolio/${current.id}`}
          className="group relative block min-h-[360px] overflow-hidden rounded-2xl bg-[#dfe4e7] md:min-h-full"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={current.id}
              src={current.cover}
              alt={`${current.title}, ${current.location}`}
              initial={{ opacity: 0, scale: reduce ? 1 : 1.035 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 text-white md:inset-x-7 md:bottom-7">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.16em] text-white/65">{current.year} / {current.location}</p>
              <p className="mt-2 font-display text-4xl tracking-[-.04em] md:text-5xl">{current.title}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-ink transition-transform group-hover:translate-x-1">&rarr;</span>
          </div>
        </Link>
      </div>

      <Link to="/portfolio" className="mt-6 inline-block font-mono text-[10px] uppercase tracking-[.16em] text-muted sm:hidden">
        View all work &rarr;
      </Link>
    </section>
  )
}
