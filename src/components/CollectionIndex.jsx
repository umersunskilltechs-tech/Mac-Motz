import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Eyebrow from './Eyebrow'

export default function CollectionIndex({ collections }) {
  const [active, setActive] = useState(null)

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex items-end justify-between">
        <Eyebrow>Archive</Eyebrow>
        <Link to="/portfolio" className="font-mono text-[10px] uppercase tracking-[.14em] text-muted hover:text-accent">
          View contact sheet &rarr;
        </Link>
      </div>
      <div className="border-t border-paper/20">
        {collections.map((item, index) => (
          <Link
            key={item.id}
            to={`/portfolio/${item.id}`}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className="group relative block overflow-hidden border-b border-paper/20 py-5 md:py-7"
          >
            <motion.img
              initial={false}
              animate={{ opacity: active === index ? 0.35 : 0, scale: active === index ? 1 : 1.08 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={item.cover}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <motion.div
              animate={{ x: active === index ? 14 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative z-10 flex flex-wrap items-baseline justify-between gap-3"
            >
              <span className="font-mono text-[10px] text-accent">{item.number}</span>
              <h3 className="mr-auto font-display text-3xl tracking-[-.04em] md:text-5xl">{item.title}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[.14em] text-muted">{item.year} &rarr;</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}
