import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Eyebrow from './Eyebrow'
import { transition } from '../motion'

export default function CollectionRow({ item, index }) {
  const reduce = useReducedMotion()
  const alignRight = index % 2 === 1

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
      className="border-t border-paper/15 px-5 py-16 md:px-10 md:py-24"
    >
      <div className="grid gap-8 md:grid-cols-12 md:items-center">
        <Link
          to={`/portfolio/${item.id}`}
          className={`group relative block aspect-[4/3] overflow-hidden bg-panel md:col-span-8 ${
            alignRight ? 'md:order-2' : ''
          }`}
        >
          <img
            src={item.cover}
            alt={`${item.title}, ${item.location}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        </Link>
        <div className={`md:col-span-4 ${alignRight ? 'md:order-1' : ''}`}>
          <Eyebrow>
            {item.number} / {item.year}
          </Eyebrow>
          <h2 className="mt-4 font-display text-5xl tracking-[-.04em] md:text-6xl">{item.title}</h2>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[.14em] text-muted">{item.location}</p>
          <p className="mt-5 max-w-sm leading-relaxed text-paper/75">{item.description}</p>
          <Link
            to={`/portfolio/${item.id}`}
            className="mt-7 inline-block border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[.18em] text-accent"
          >
            Open series &rarr;
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
