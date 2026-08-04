import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// Fixed index on the right edge. Replaces the old full-width index section:
// same data, no thumbnails, always reachable. Collapsed to numbers so it sits
// in the page gutter instead of over the photographs; the titles slide out on
// hover. Tracks whichever collection block is crossing the middle of the view.
export default function ArchiveRail({ collections }) {
  const [active, setActive] = useState(collections[0]?.id ?? null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.filter((entry) => entry.isIntersecting)
        if (current.length) setActive(current[0].target.id)
      },
      // Only the section crossing the middle band of the viewport counts.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    for (const collection of collections) {
      const el = document.getElementById(collection.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [collections])

  return (
    <motion.nav
      aria-label="Archive index"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      animate={{
        backgroundColor: open ? 'rgba(244,242,236,0.96)' : 'rgba(244,242,236,0.72)',
        borderColor: open ? 'rgba(18,16,13,0.12)' : 'rgba(18,16,13,0.04)',
        paddingLeft: open ? 16 : 10,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 border py-4 pr-3 backdrop-blur-md lg:block"
    >
      <motion.p
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="mb-3 text-right font-mono text-[9px] uppercase tracking-[.22em] text-sub"
      >
        Archive
      </motion.p>

      <ul className="space-y-2.5">
        {collections.map((collection) => {
          const isActive = active === collection.id
          return (
            <li key={collection.id}>
              <a
                href={`#${collection.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center justify-end gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <motion.span
                  animate={{ width: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[.14em] transition-colors ${
                    isActive ? 'text-accent' : 'text-sub group-hover:text-ink'
                  }`}
                >
                  {collection.title}
                </motion.span>
                <span
                  className={`font-mono text-[9px] tabular-nums transition-colors ${
                    isActive ? 'text-accent' : 'text-sub/60 group-hover:text-ink'
                  }`}
                >
                  {collection.number}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ width: isActive ? 22 : 7, opacity: isActive ? 1 : 0.4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-px ${isActive ? 'bg-accent' : 'bg-ink'}`}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
