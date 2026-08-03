import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { collections } from '../data'
import Eyebrow from '../components/Eyebrow'
import CollectionRow from '../components/CollectionRow'
import CollectionIndex from '../components/CollectionIndex'
import Footer from '../components/Footer'
import { transition } from '../motion'

export default function Home() {
  const reduce = useReducedMotion()
  const featured = collections[0]

  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden">
        <img
          src={featured.cover}
          alt={`${featured.title}, ${featured.location}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink" />
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.15 }}
          className="relative z-10 flex flex-col gap-10 px-5 pb-10 pt-28 md:px-10 md:pb-14"
        >
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[.18em] text-paper/75">
            <span>Mac Motz / Photographer</span>
            <span>2018&mdash;2026</span>
          </div>
          <h1 className="max-w-2xl font-display text-6xl leading-[.9] tracking-[-.05em] md:text-8xl">
            The distance between places.
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/25 pt-4 font-mono text-[10px] uppercase tracking-[.18em] text-paper/70">
            <span>Scroll to explore</span>
            <span>Six long-form studies of place &amp; people</span>
          </div>
        </motion.div>
      </section>

      <section className="pt-20 md:pt-28">
        <div className="flex items-end justify-between px-5 md:px-10">
          <Eyebrow>Selected collections</Eyebrow>
          <Link to="/portfolio" className="font-mono text-[10px] uppercase tracking-[.16em] text-muted hover:text-accent">
            View all work &rarr;
          </Link>
        </div>
        {collections.map((item, index) => (
          <CollectionRow key={item.id} item={item} index={index} />
        ))}
      </section>

      <CollectionIndex collections={collections} />

      <section className="border-y border-paper/20 px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <Eyebrow>About the work</Eyebrow>
          <div className="md:col-span-8">
            <p className="font-display text-3xl leading-[1.05] tracking-[-.03em] md:text-6xl">
              Photographs made around the edges of ordinary life: places passed through, rooms emptied, and family
              gathered at the end of the day.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-block border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[.2em] text-accent"
            >
              More about Mac &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
