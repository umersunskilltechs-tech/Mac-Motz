import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { allFrames, collections } from '../data'
import Eyebrow from '../components/Eyebrow'
import CollectionIndex from '../components/CollectionIndex'
import CollectionTabs from '../components/CollectionTabs'
import ScrollGalleryHero from '../components/ScrollGalleryHero'
import MarqueeGallery from '../components/MarqueeGallery'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'
import StatsBand from '../components/StatsBand'
import FieldNotes from '../components/FieldNotes'

export default function Home() {
  const [openId, setOpenId] = useState(null)

  return (
    <>
      <ScrollGalleryHero collections={collections} />

      <MarqueeGallery frames={allFrames} onOpen={setOpenId} />

      <StatsBand collections={collections} totalFrames={allFrames.length} />

      <CollectionTabs collections={collections} />

      <FieldNotes collections={collections} />

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

      <AnimatePresence>
        {openId && <Lightbox frames={allFrames} startId={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}
