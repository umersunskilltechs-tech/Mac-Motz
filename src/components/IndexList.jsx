import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { easeOut } from '../motion'

// Numbered archive index. Doubles as jump-navigation into the collection blocks
// stacked below it, and previews each collection on hover or keyboard focus.
export default function IndexList({ collections, framesByCollection }) {
  const [activeId, setActiveId] = useState(null)
  const reduce = useReducedMotion()

  return (
    <ul className="border-t border-ink/15">
      {collections.map((collection) => {
        const open = activeId === collection.id
        return (
          <li
            key={collection.id}
            className="border-b border-ink/15"
            onMouseEnter={() => setActiveId(collection.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <a
              href={`#${collection.id}`}
              onFocus={() => setActiveId(collection.id)}
              onBlur={() => setActiveId(null)}
              className="flex items-baseline gap-4 py-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:gap-8"
            >
              <span className="w-8 shrink-0 font-mono text-[10px] uppercase tracking-[.2em] text-sub">
                {collection.number}
              </span>
              <span className="flex-1 font-display text-2xl leading-none tracking-[-.03em] md:text-4xl">
                {collection.title}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[.2em] text-sub sm:block">
                {collection.location}
              </span>
              <span className="w-12 shrink-0 text-right font-mono text-[10px] uppercase tracking-[.2em] text-sub">
                {collection.year}
              </span>
            </a>

            <AnimatePresence initial={false}>
              {open && !reduce && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 pb-4">
                    {framesByCollection[collection.id].slice(0, 6).map((frame) => (
                      <img
                        key={frame.id}
                        src={frame.src}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-20 w-16 shrink-0 object-cover md:h-28 md:w-24"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
