import { useEffect, useRef } from 'react'

// Fixed canvas of slowly drifting dust motes — the "light through a projector beam"
// texture that keeps the page from reading as a flat white sheet.
export default function GrainField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let motes = []
    let frame = null
    let width = 0
    let height = 0
    let seededWidth = 0
    const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 }

    function seed() {
      const count = Math.min(300, Math.round((width * height) / 9000))
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.5,
        rise: Math.random() * 0.18 + 0.04,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.006 + 0.002,
        depth: Math.random() * 0.85 + 0.15,
        alpha: Math.random() * 0.4 + 0.22,
      }))
    }

    function resize() {
      // Measure the element, never window.innerWidth, and never write an
      // explicit CSS width back. The canvas is `fixed inset-0`, so CSS already
      // sizes it; setting a pixel width made the layout wider than the screen,
      // which triggered mobile shrink-to-fit and oscillated the viewport.
      const rect = canvas.getBoundingClientRect()
      width = Math.round(rect.width)
      height = Math.round(rect.height)
      if (!width || !height) return

      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      // Mobile browsers fire resize every time the address bar hides. Re-seeding
      // on those would visibly jolt the whole field, so only reseed on a real
      // width change (rotation, desktop window drag).
      if (Math.abs(width - seededWidth) > 80) {
        seededWidth = width
        seed()
      }
      if (reduce) draw()
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)
      pointer.x += (pointer.targetX - pointer.x) * 0.05
      pointer.y += (pointer.targetY - pointer.y) * 0.05

      for (const mote of motes) {
        mote.y -= mote.rise
        mote.sway += mote.swaySpeed
        if (mote.y < -8) {
          mote.y = height + 8
          mote.x = Math.random() * width
        }

        const x = mote.x + Math.sin(mote.sway) * 9 + pointer.x * mote.depth
        const y = mote.y + pointer.y * mote.depth * 0.5
        // Slow twinkle so the field breathes instead of sitting static.
        const twinkle = 0.65 + Math.sin(mote.sway * 1.7) * 0.35

        ctx.beginPath()
        ctx.arc(x, y, mote.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(42, 35, 25, ${mote.alpha * twinkle})`
        ctx.fill()
      }

      if (!reduce) frame = window.requestAnimationFrame(draw)
    }

    function onPointerMove(event) {
      pointer.targetX = (event.clientX / (width || 1) - 0.5) * 26
      pointer.targetY = (event.clientY / (height || 1) - 0.5) * 26
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduce) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      frame = window.requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
