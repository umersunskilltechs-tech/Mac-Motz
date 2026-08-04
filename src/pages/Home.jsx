import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { allFrames, collections, framesByCollection } from '../data'
import Eyebrow from '../components/Eyebrow'
import Masthead from '../components/Masthead'
import IndexList from '../components/IndexList'
import CollectionBlock from '../components/CollectionBlock'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'

export default function Home() {
  const [openId, setOpenId] = useState(null)

  return (
    <>
      <Masthead
        firstCollection={collections[0]}
        collectionCount={collections.length}
        frameCount={allFrames.length}
      />

      <section className="px-5 pb-8 md:px-10" aria-label="Collection index">
        <Eyebrow>Archive index</Eyebrow>
        <div className="mt-5">
          <IndexList collections={collections} framesByCollection={framesByCollection} />
        </div>
      </section>

      {collections.map((collection, index) => (
        <CollectionBlock
          key={collection.id}
          collection={collection}
          frames={framesByCollection[collection.id]}
          position={index + 1}
          total={collections.length}
          next={collections[index + 1] ?? null}
          onOpen={setOpenId}
        />
      ))}

      <section className="border-t border-ink/15 px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Eyebrow>About the work</Eyebrow>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-3xl leading-[1.05] tracking-[-.03em] md:text-5xl">
              Photographs made around the edges of ordinary life: places passed through, rooms emptied, and family
              gathered at the end of the day.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-block border-b border-accent pb-1 font-mono text-[10px] uppercase tracking-[.2em] text-accent transition hover:border-ink hover:text-ink"
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
