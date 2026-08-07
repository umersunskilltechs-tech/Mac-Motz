import { Link } from 'react-router-dom'
import LeadSlider from './LeadSlider'
import ContactSheet from './ContactSheet'
import Typewriter from './Typewriter'
import Reveal from './Reveal'

// The single section this whole site is built from. The homepage stacks one of
// these per collection; the series page renders exactly one. Nothing else on the
// page competes with it.
export default function CollectionBlock({ collection, frames, position, total, next, onOpen, standalone = false }) {
  // On the series page this block is the whole page, so its title carries the
  // document heading and the link to itself is dropped.
  const Title = standalone ? 'h1' : 'h2'

  return (
    <section
      id={collection.id}
      aria-labelledby={`${collection.id}-title`}
      className="scroll-mt-24 border-t border-ink/15 px-5 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="min-w-0 md:col-span-4 md:sticky md:top-28 md:self-start">
          <Reveal y={26}>
            <p className="font-display text-6xl leading-none tracking-tighter text-accent md:text-7xl">
              {collection.number}
            </p>
          </Reveal>
          <Typewriter
            as={Title}
            id={`${collection.id}-title`}
            text={collection.title}
            speed={70}
            delay={220}
            className="mt-4 block font-display text-4xl leading-[1.02] tracking-[-.035em] md:text-5xl"
          />
          <Reveal delay={0.14} className="mt-3">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-sub">
              {collection.year} &middot; {collection.location} &middot; {frames.length} frames
            </p>
          </Reveal>
          <Reveal delay={0.22} className="mt-6">
            <p className="max-w-sm text-[15px] leading-relaxed text-ink/75">{collection.description}</p>
          </Reveal>
          {!standalone && (
            <Reveal delay={0.3} className="mt-8">
              <Link
                to={`/portfolio/${collection.id}`}
                className="inline-block border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[.2em] text-accent transition hover:border-ink hover:text-ink"
              >
                View collection &rarr;
              </Link>
            </Reveal>
          )}
        </div>

        {/* min-w-0: grid items default to min-width:auto, so without it the lead
            slider's nowrap caption expands this track past the screen width. */}
        <div className="min-w-0 space-y-12 md:col-span-8">
          <LeadSlider frames={frames} onOpen={onOpen} />
          <ContactSheet frames={frames} onOpen={onOpen} />
        </div>
      </div>

      <Reveal className="mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink/15 pt-4 font-mono text-[10px] uppercase tracking-[.2em] text-sub">
        <span>
          Collection ( {String(position).padStart(2, '0')} / {String(total).padStart(2, '0')} )
        </span>
        <span className="text-ink">{collection.title}</span>
        {next ? (
          <a href={`#${next.id}`} className="transition hover:text-accent">
            Next: {next.title} &darr;
          </a>
        ) : (
          <a href="#top" className="transition hover:text-accent">
            Back to top &uarr;
          </a>
        )}
      </Reveal>
    </section>
  )
}
