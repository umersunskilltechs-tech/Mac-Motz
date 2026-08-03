import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { collections, allFrames } from '../data'
import Eyebrow from '../components/Eyebrow'
import FrameGrid from '../components/FrameGrid'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'

export default function Series() {
  const { series } = useParams()
  const item = collections.find((c) => c.id === series)
  const [openId, setOpenId] = useState(null)
  const reduce = useReducedMotion()

  if (!item) {
    return (
      <section className="px-5 pb-28 pt-36 text-center md:px-10 md:pt-44">
        <Eyebrow>Not found</Eyebrow>
        <h1 className="mt-5 font-display text-6xl tracking-[-.05em]">No such collection.</h1>
        <Link to="/portfolio" className="mt-8 inline-block font-mono text-[10px] uppercase tracking-[.16em] text-accent">
          &larr; Back to portfolio
        </Link>
      </section>
    )
  }

  const frames = allFrames.filter((frame) => frame.collection.id === item.id)

  return (
    <>
      <section className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
        <Link to="/portfolio" className="font-mono text-[10px] uppercase tracking-[.16em] text-accent">
          &larr; All collections
        </Link>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-10 md:grid-cols-12"
        >
          <div className="md:col-span-4">
            <Eyebrow>
              {item.number} / {item.year}
            </Eyebrow>
            <h1 className="mt-4 font-display text-6xl tracking-[-.05em] md:text-8xl">{item.title}</h1>
            <p className="mt-8 leading-relaxed text-paper/75">{item.description}</p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[.14em] text-muted">
              {item.location} / {frames.length} frames
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <FrameGrid frames={frames} onOpen={setOpenId} />
          </div>
        </motion.div>
      </section>
      <Footer />
      <AnimatePresence>
        {openId && <Lightbox frames={frames} startId={openId} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </>
  )
}
