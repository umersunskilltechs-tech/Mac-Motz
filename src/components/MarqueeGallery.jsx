import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

function GalleryRow({ frames, progress, reverse, onOpen, reduce }) {
  const forwardX = useTransform(progress, [0, 1], ['2%', '-38%'])
  const reverseX = useTransform(progress, [0, 1], ['-38%', '2%'])

  return (
    <div className="overflow-hidden" style={{ touchAction: 'pan-y' }}>
      <motion.div
        style={{ x: reduce ? (reverse ? '-18%' : '-8%') : reverse ? reverseX : forwardX }}
        className="flex w-max gap-4 will-change-transform md:gap-5"
      >
        {[...frames, ...frames].map((frame, index) => (
          <button
            key={`${frame.id}-${index}`}
            type="button"
            onClick={() => onOpen(frame.id)}
            className="relative block h-40 w-56 shrink-0 overflow-hidden bg-panel md:h-60 md:w-80"
          >
            <img
              src={frame.src}
              alt={index < frames.length ? frame.alt : ''}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]"
            />
          </button>
        ))}
      </motion.div>
    </div>
  )
}

export default function MarqueeGallery({ frames, onOpen }) {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const midpoint = Math.ceil(frames.length / 2)
  const rowA = frames.slice(0, midpoint)
  const rowB = frames.slice(midpoint)

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24" aria-label="Scroll-controlled frame gallery">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent md:w-32" />
      <div className="flex flex-col gap-4 md:gap-5">
        <GalleryRow frames={rowA} progress={scrollYProgress} reverse={false} onOpen={onOpen} reduce={reduce} />
        <GalleryRow frames={rowB} progress={scrollYProgress} reverse onOpen={onOpen} reduce={reduce} />
      </div>
    </section>
  )
}
