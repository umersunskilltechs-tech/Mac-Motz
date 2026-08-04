import { motion } from 'motion/react'

export default function FrameGrid({ frames, onOpen, showCollection = false }) {
  return (
    <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {frames.map((plate) => (
        <motion.button
          layout
          key={plate.id}
          type="button"
          onClick={() => onOpen(plate.id)}
          className="group relative aspect-[4/5] overflow-hidden bg-panel text-left"
        >
          <img
            src={plate.src}
            alt={plate.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 font-mono text-[10px] text-paper drop-shadow">
            {plate.frame}
          </span>
          {showCollection && (
            <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[.12em] text-paper opacity-0 transition group-hover:opacity-100">
              {plate.collection.title}
            </span>
          )}
        </motion.button>
      ))}
    </motion.div>
  )
}
