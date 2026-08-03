import { motion } from 'motion/react'

export default function Preloader({ durationMs }) {
  return (
    <motion.div
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-5 md:p-10"
      aria-hidden="true"
    >
      <p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">Mac Motz / Photographs</p>
      <p className="font-display text-[18vw] leading-none tracking-[-.06em]">MM</p>
      <div className="h-px overflow-hidden bg-paper/20">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: Math.max(0.1, durationMs / 1000 - 0.1), ease: [0.76, 0, 0.24, 1] }}
          className="h-full bg-accent"
        />
      </div>
    </motion.div>
  )
}
