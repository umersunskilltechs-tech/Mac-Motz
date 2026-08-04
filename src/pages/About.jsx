import { motion } from 'motion/react'
import Eyebrow from '../components/Eyebrow'
import { fadeUp, transition } from '../motion'
import { collections } from '../data'
import Footer from '../components/Footer'

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
  return (
    <>
      <section className="px-5 pt-32 pb-24 md:px-10 md:pt-44">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={transition}
          className="grid items-end gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-9">
            <Eyebrow>Biography / Practice</Eyebrow>
            <h1 className="mt-5 font-display text-[15vw] leading-[.8] tracking-[-.065em] md:text-[10vw]">
              Looking closely.
            </h1>
          </div>
          <p className="max-w-sm pb-2 text-lg leading-relaxed text-ink/65 md:col-span-3">
            Documentary photography about place, memory, and the traces people leave behind.
          </p>
        </motion.div>

        <div className="mt-16 grid h-[55vh] min-h-105 gap-3 md:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden">
            <img
              src={collections[3].cover}
              alt="Portrait from the Kin collection"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid gap-3 overflow-hidden">
            <div className="overflow-hidden">
              <img
                src={collections[1].cover}
                alt="Landscape from the Low Country collection"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img
                src={collections[4].cover}
                alt="Photograph from the Static collection"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-14 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>About Mac Motz</Eyebrow>
            <p className="mt-6 font-mono text-[10px] uppercase leading-loose tracking-[.15em] text-sub">
              Based in the United States
              <br />
              Available for assignments &amp; commissions
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="font-display text-4xl leading-[1.02] tracking-[-.04em] md:text-6xl">
              A slow practice built around returning, noticing, and staying with a place.
            </p>

            <div className="mt-16 grid gap-10 border-t border-ink/15 pt-8 text-lg leading-relaxed text-ink/75 md:grid-cols-2">
              <p>
                Mac Motz is a photographer interested in the quiet evidence of people moving through the world. The
                work begins with place and stays long enough to notice what is easily missed — a marsh at low tide, a
                motel room mid-way through being reclaimed, a family gathered at the end of the day.
              </p>
              <p>
                Across landscapes, roadside interiors, and family archives, each long-form collection considers the
                distance between memory and the present moment. The photographs are made slowly, over years, in one
                place at a time.
              </p>
            </div>

            <div className="mt-20 grid gap-10 border-t border-ink/15 pt-8 md:grid-cols-2">
              <div>
                <Eyebrow>Selected exhibitions</Eyebrow>
                <ul className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-[.1em] text-ink/75">
                  {exhibitions.map((entry) => (
                    <li key={entry.title} className="flex gap-4">
                      <span className="text-sub">{entry.year}</span>
                      <span>{entry.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Eyebrow>Press &amp; publications</Eyebrow>
                <ul className="mt-5 space-y-3 font-mono text-[11px] uppercase tracking-[.1em] text-ink/75">
                  {press.map((entry) => (
                    <li key={entry.outlet}>
                      <span>{entry.outlet}</span>
                      <br />
                      <span className="text-sub">{entry.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 border-t border-ink/15 pt-8">
              <Eyebrow>Inquiries</Eyebrow>
              <a href="mailto:hello@macmotz.com" className="mt-4 block font-display text-3xl text-accent md:text-4xl">
                hello@macmotz.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
