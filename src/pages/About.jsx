import { motion, useReducedMotion } from 'motion/react'
import Eyebrow from '../components/Eyebrow'
import { fadeUp, transition } from '../motion'

const exhibitions = [
  { year: '2025', title: 'Vacancy — solo exhibition, Tucson Center for Photography (placeholder)' },
  { year: '2024', title: 'New American Landscape — group show, Midwest Photography Biennial (placeholder)' },
  { year: '2023', title: 'Low Country — featured portfolio, Southern Documentary Review (placeholder)' },
]

const press = [
  { outlet: 'Aperture Journal (placeholder)', note: 'Portfolio feature on Kin, 2024' },
  { outlet: 'Lens Culture (placeholder)', note: 'Selected artist, documentary category' },
]

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-3">
          <Eyebrow>About Mac Motz</Eyebrow>
          <p className="mt-6 font-mono text-[10px] uppercase leading-loose tracking-[.15em] text-muted">
            Based in the United States
            <br />
            Available for assignments &amp; commissions
          </p>
        </div>

        <div className="md:col-span-8">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={transition}
            className="font-display text-5xl leading-[.96] tracking-[-.05em] md:text-8xl"
          >
            Looking closely at what remains.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: 0.1 }}
            className="mt-16 grid gap-10 border-t border-paper/20 pt-8 text-lg leading-relaxed text-paper/80 md:grid-cols-2"
          >
            <p>
              Mac Motz is a photographer interested in the quiet evidence of people moving through the world. The
              work begins with place and stays long enough to notice what is easily missed — a marsh at low tide,
              a motel room mid-way through being reclaimed, a family gathered at the end of the day.
            </p>
            <p>
              Across landscapes, roadside interiors, and family archives, each long-form series considers the
              distance between memory and the present moment. The photographs are made slowly, over years, in one
              place at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...transition, delay: 0.15 }}
            className="mt-20 grid gap-10 border-t border-paper/20 pt-8 md:grid-cols-2"
          >
            <div>
              <Eyebrow>Selected exhibitions</Eyebrow>
              <ul className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-[.1em] text-paper/75">
                {exhibitions.map((entry) => (
                  <li key={entry.title} className="flex gap-4">
                    <span className="text-muted">{entry.year}</span>
                    <span>{entry.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Press &amp; publications</Eyebrow>
              <ul className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-[.1em] text-paper/75">
                {press.map((entry) => (
                  <li key={entry.outlet}>
                    <span>{entry.outlet}</span>
                    <br />
                    <span className="text-muted">{entry.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...transition, delay: 0.2 }}
            className="mt-16 border-t border-paper/20 pt-8"
          >
            <Eyebrow>Inquiries</Eyebrow>
            <a href="mailto:hello@macmotz.com" className="mt-4 block font-display text-3xl text-accent md:text-4xl">
              hello@macmotz.com
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
