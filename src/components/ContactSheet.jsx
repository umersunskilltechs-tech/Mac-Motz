import { motion } from 'motion/react'
import { easeOut } from '../motion'

// Every frame in a collection laid out as a captioned contact sheet.
export default function ContactSheet({ frames, onOpen, columns = 'grid-cols-2 md:grid-cols-4' }) {
  return (
    <ul className={`grid gap-x-3 gap-y-6 ${columns}`}>
      {frames.map((frame, index) => (
        <motion.li
          key={frame.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: easeOut }}
        >
          <button
            type="button"
            data-cursor="view"
            onClick={() => onOpen(frame.id)}
            className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden bg-ink/5">
              <img
                src={frame.src}
                alt={frame.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-page/0 transition duration-500 group-hover:bg-page/15" />
            </div>
            <span className="mt-2 flex items-baseline justify-between gap-2 font-mono text-[9px] uppercase tracking-[.18em] text-sub">
              <span>{frame.frame}</span>
              <span className="opacity-0 transition group-hover:opacity-100">View</span>
            </span>
          </button>
        </motion.li>
      ))}
    </ul>
  )
}
