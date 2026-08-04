import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import Eyebrow from './Eyebrow'

export default function FieldNotes({ collections }) {
  const reduce = useReducedMotion()
  const primary = collections[1]
  const secondary = collections[4]

  return (
    <section className="overflow-hidden px-5 py-24 md:px-10 md:py-36">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-5"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img src={primary.cover} alt={`${primary.title}, ${primary.location}`} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-3 aspect-square w-2/5 overflow-hidden border-8 border-ink md:-right-12">
            <img src={secondary.cover} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 md:col-span-6 md:col-start-7 md:pt-0"
        >
          <Eyebrow>Field notes / Approach</Eyebrow>
          <p className="mt-6 font-display text-4xl leading-[1.02] tracking-[-.04em] md:text-6xl">
            The most revealing moments rarely announce themselves.
          </p>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/65">
            Each series begins with time in a place—walking, returning, and waiting for the ordinary details that make a landscape personal.
          </p>
          <Link to="/about" className="mt-9 inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[.17em] text-accent">
            Read the story <span className="text-lg">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
