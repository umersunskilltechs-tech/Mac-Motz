import { motion, useReducedMotion } from 'motion/react'
import { easeOut } from '../motion'

// Fades body copy and metadata up as it enters the viewport.
export default function Reveal({ children, as = 'div', delay = 0, y = 18, className = '' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: easeOut }}
    >
      {children}
    </Tag>
  )
}
