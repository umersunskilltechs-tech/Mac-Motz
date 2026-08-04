import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'

function wrap(index, length) {
  return ((index % length) + length) % length
}

function Chevron({ previous = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-[18px] w-[18px] ${previous ? 'rotate-180' : ''}`}
    >
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Image adaptation of the referenced Framer VideoCarousel. It keeps the same
// perspective stack, spring, blur, scale, swipe threshold and pill navigation.
export default function CoverflowCarousel({ frames, activeIndex, onChange, reduce }) {
  const dragStart = useRef(null)
  const wheelLocked = useRef(false)
  const activeDot = useRef(null)
  const [dragging, setDragging] = useState(false)
  const length = frames.length

  const goTo = useCallback((next) => onChange(wrap(next, length)), [length, onChange])
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    activeDot.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIndex, reduce])

  const cards = useMemo(() => {
    const half = Math.floor(length / 2)
    return frames.map((frame, index) => {
      let offset = index - activeIndex
      if (length > 2) {
        if (offset > half) offset -= length
        if (offset < -half) offset += length
      }
      return { frame, index, offset }
    })
  }, [activeIndex, frames, length])

  const visibleDots = useMemo(() => {
    if (length <= 5) return frames.map((_, index) => index)
    return [-2, -1, 0, 1, 2].map((offset) => wrap(activeIndex + offset, length))
  }, [activeIndex, frames, length])

  function onPointerDown(event) {
    if (length < 2) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    dragStart.current = { x: event.clientX, index: activeIndex }
    setDragging(true)
  }

  function onPointerUp(event) {
    if (!dragStart.current) return
    const start = dragStart.current
    dragStart.current = null
    setDragging(false)
    const delta = event.clientX - start.x
    if (Math.abs(delta) >= 24) goTo(start.index + (delta < 0 ? 1 : -1))
  }

  function onWheel(event) {
    if (length < 2 || wheelLocked.current || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
    wheelLocked.current = true
    goTo(activeIndex + (event.deltaX > 0 ? 1 : -1))
    window.setTimeout(() => (wheelLocked.current = false), 420)
  }

  return (
    <div
      className={`relative flex h-full w-full touch-pan-y select-none items-center justify-center overflow-hidden ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ perspective: 1000 }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      role="region"
      aria-label="Portfolio image carousel"
    >
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
        {cards.map(({ frame, index, offset }) => {
          const distance = Math.abs(offset)
          const active = offset === 0
          const opacity = distance > 3 ? 0 : 1 - Math.min(0.75, distance * 0.18)
          const transform = `translateX(${offset * 156}px) translateZ(${-distance * 105}px) rotateY(${offset * -11}deg) scale(${active ? 1 : 0.94})`

          return (
            <motion.figure
              key={frame.id}
              initial={false}
              animate={reduce ? { opacity: active ? 1 : 0 } : { opacity, transform, filter: `blur(${active ? 0 : 10}px)` }}
              whileHover={!reduce && active ? { scale: 1.03, filter: 'blur(0px)' } : undefined}
              transition={{ type: 'spring', stiffness: 520, damping: 44 }}
              className="absolute left-1/2 top-1/2 m-0 overflow-hidden rounded-2xl bg-panel shadow-[0_28px_80px_rgba(0,0,0,.48)]"
              style={{
                width: 'min(62vw, 360px)',
                height: 'min(64vh, 520px)',
                marginLeft: 'calc(-.5 * min(62vw, 360px))',
                marginTop: 'calc(-.5 * min(64vh, 520px))',
                transformStyle: 'preserve-3d',
                pointerEvents: active ? 'auto' : 'none',
                zIndex: length - distance,
              }}
              aria-hidden={!active}
            >
              <img src={frame.src} alt={active ? frame.alt : ''} draggable={false} className="h-full w-full object-cover" />
              {!active && <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />}
            </motion.figure>
          )
        })}
      </div>

      {length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => { event.stopPropagation(); previous() }}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg transition-transform hover:scale-105 md:left-5"
          >
            <Chevron previous />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={(event) => { event.stopPropagation(); next() }}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg transition-transform hover:scale-105 md:right-5"
          >
            <Chevron />
          </button>

          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-3 py-2.5 shadow-lg" role="tablist" aria-label="Carousel navigation">
            {visibleDots.map((index) => (
              <button
                key={frames[index].id}
                ref={index === activeIndex ? activeDot : null}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to image ${index + 1}`}
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                onClick={(event) => { event.stopPropagation(); goTo(index) }}
                className={`h-2 w-2 shrink-0 rounded-full transition-colors ${index === activeIndex ? 'bg-ink' : 'bg-ink/25 hover:bg-ink/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
