import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// Fixed index on the right edge, at every breakpoint. Same data as a full
// index section would show, but collapsed to numbers so it never competes
// with the photographs; titles slide out on hover (desktop only — there's no
// hover on touch, so phones and tablets just keep the compact numbered form).
// Tracks whichever collection block is crossing the middle of the viewport.
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
        paddingLeft: open ? 16 : 8,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2 border py-2.5 pr-2 backdrop-blur-md lg:right-2 lg:py-4 lg:pr-3"
    >
      <motion.p
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="mb-3 hidden text-right font-mono text-[9px] uppercase tracking-[.22em] text-sub lg:block"
      >
        Archive
      </motion.p>

      <ul className="space-y-1.5 lg:space-y-2.5">
        {collections.map((collection) => {
          const isActive = active === collection.id
          return (
            <li key={collection.id}>
              {/* p-1.5 -m-1.5 grows the touch target without growing what's
                  visible — the numbers stay small, the tap area doesn't. */}
              <a
                href={`#${collection.id}`}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Jump to ${collection.title}, collection ${collection.number}`}
                className="group -m-1.5 flex items-center justify-end gap-1.5 p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:gap-2.5"
              >
                <motion.span
                  animate={{ width: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`hidden overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[.14em] transition-colors lg:inline-block ${
                    isActive ? 'text-accent' : 'text-sub group-hover:text-ink'
                  }`}
                >
                  {collection.title}
                </motion.span>
                <span
                  className={`font-mono text-[8px] tabular-nums transition-colors lg:text-[9px] ${
                    isActive ? 'text-accent' : 'text-sub/60 group-hover:text-ink'
                  }`}
                >
                  {collection.number}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ width: isActive ? 16 : 5, opacity: isActive ? 1 : 0.4 }}
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
