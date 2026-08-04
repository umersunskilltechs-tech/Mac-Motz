import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { collections, framesByCollection } from '../data'
import Eyebrow from '../components/Eyebrow'
import Reveal from '../components/Reveal'
import CollectionBlock from '../components/CollectionBlock'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'

export default function Series() {
  const { series } = useParams()
  const [openId, setOpenId] = useState(null)

  const index = collections.findIndex((collection) => collection.id === series)
  const collection = collections[index]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [series])

  if (!collection) {
    return (
      <section className="px-5 pt-40 pb-32 md:px-10">
        <Eyebrow>Not found</Eyebrow>
        <h1 className="mt-5 font-display text-5xl tracking-[-.04em]">That collection does not exist.</h1>
        <Link
          to="/portfolio"
          className="mt-8 inline-block border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[.2em] text-accent"
        >
          Back to the archive &rarr;
        </Link>
      </section>
    )
  }

  const frames = framesByCollection[collection.id]
  const previous = collections[index - 1] ?? collections[collections.length - 1]
  const next = collections[index + 1] ?? collections[0]

  return (
    <>
      <Reveal className="px-5 pt-32 pb-4 md:px-10 md:pt-40">
        <Link to="/portfolio" className="font-mono text-[10px] uppercase tracking-[.2em] text-sub hover:text-accent">
          &larr; All collections
        </Link>
      </Reveal>

      <CollectionBlock
        collection={collection}
        frames={frames}
        position={index + 1}
        total={collections.length}
        next={null}
        onOpen={setOpenId}
        standalone
      />

      <nav className="grid gap-px border-t border-ink/15 bg-ink/15 grid-cols-2">
        <Link to={`/portfolio/${previous.id}`} className="group bg-page px-5 py-12 md:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-sub">&larr; Previous</span>
          <span className="mt-3 block font-display text-3xl tracking-[-.03em] transition group-hover:text-accent md:text-4xl">
            {previous.title}
          </span>
        </Link>
        <Link to={`/portfolio/${next.id}`} className="group bg-page px-5 py-12 text-right md:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-sub">Next &rarr;</span>
          <span className="mt-3 block font-display text-3xl tracking-[-.03em] transition group-hover:text-accent md:text-4xl">
            {next.title}
          </span>
        </Link>
      </nav>

      <Footer />

      <AnimatePresence>
        {openId && <Lightbox frames={frames} startId={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}
