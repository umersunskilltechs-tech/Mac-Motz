import Eyebrow from '../components/Eyebrow'
import Typewriter from '../components/Typewriter'
import Reveal from '../components/Reveal'
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

// Numbered chapter, laid out like a collection block so the two pages read as
// one system: sticky label column on the left, content on the right.
function Chapter({ number, label, children }) {
  return (
    <section className="grid gap-8 border-t border-ink/15 py-14 md:grid-cols-12 md:gap-8 md:py-20">
      <Reveal className="md:col-span-3 md:sticky md:top-28 md:self-start">
        <p className="font-display text-5xl leading-none tracking-[-.05em] text-accent">{number}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[.2em] text-sub">{label}</p>
      </Reveal>
      <div className="md:col-span-8">{children}</div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <section className="px-5 pt-32 pb-8 md:px-10 md:pt-44">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-9">
            <Reveal>
              <Eyebrow>Biography / Practice</Eyebrow>
            </Reveal>
            <Typewriter
              as="h1"
              text="Looking closely."
              speed={80}
              delay={320}
              className="mt-5 block font-display text-[15vw] leading-[.8] tracking-[-.065em] md:text-[10vw]"
            />
          </div>
          <Reveal delay={0.2} className="md:col-span-3">
            <p className="max-w-sm pb-2 text-lg leading-relaxed text-ink/65">
              Documentary photography about place, memory, and the traces people leave behind.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid h-[55vh] min-h-105 gap-3 md:grid-cols-[2fr_1fr]">
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
        </Reveal>

        <div className="mt-20">
          <Chapter number="01" label="The practice">
            <Typewriter
              as="p"
              text="A slow practice built around returning, noticing, and staying with a place."
              speed={18}
              className="block font-display text-3xl leading-[1.05] tracking-[-.04em] md:text-5xl"
            />
            <div className="mt-12 grid gap-10 text-lg leading-relaxed text-ink/75 md:grid-cols-2">
              <Reveal>
                <p>
                  Mac Motz is a photographer interested in the quiet evidence of people moving through the world.
                  The work begins with place and stays long enough to notice what is easily missed — a marsh at low
                  tide, a motel room mid-way through being reclaimed, a family gathered at the end of the day.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p>
                  Across landscapes, roadside interiors, and family archives, each long-form collection considers
                  the distance between memory and the present moment. The photographs are made slowly, over years,
                  in one place at a time.
                </p>
              </Reveal>
            </div>
          </Chapter>

          <Chapter number="02" label="Selected exhibitions">
            <ul>
              {exhibitions.map((entry, index) => (
                <Reveal as="li" key={entry.title} delay={index * 0.08}>
                  <div className="flex flex-col gap-1 border-b border-ink/10 py-5 sm:flex-row sm:gap-8">
                    <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[.2em] text-accent">
                      {entry.year}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink/80">{entry.title}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Chapter>

          <Chapter number="03" label="Press &amp; publications">
            <ul>
              {press.map((entry, index) => (
                <Reveal as="li" key={entry.outlet} delay={index * 0.08}>
                  <div className="border-b border-ink/10 py-5">
                    <p className="text-[15px] text-ink/80">{entry.outlet}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[.18em] text-sub">{entry.note}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Chapter>

          <Chapter number="04" label="Inquiries">
            <Reveal>
              <p className="max-w-lg text-lg leading-relaxed text-ink/75">
                Commissions, exhibitions, and licensing. Every project is quoted to its brief — there are no
                packages or fixed pricing.
              </p>
              <a
                href="mailto:hello@macmotz.com"
                className="mt-6 inline-block font-display text-3xl text-accent transition hover:text-ink md:text-4xl"
              >
                hello@macmotz.com
              </a>
            </Reveal>
          </Chapter>
        </div>
      </section>

      <Footer />
    </>
  )
}
