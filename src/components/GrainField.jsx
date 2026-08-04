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
    const pointer = { targetX: 0, targetY: 0, x: 0, y: 0 }

    function seed() {
      const { innerWidth: w, innerHeight: h } = window
      const count = Math.min(150, Math.round((w * h) / 24000))
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.35,
        rise: Math.random() * 0.16 + 0.03,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.006 + 0.002,
        depth: Math.random() * 0.85 + 0.15,
        alpha: Math.random() * 0.3 + 0.1,
      }))
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      seed()
      if (reduce) draw(0)
    }

    function draw(time) {
      const { innerWidth: w, innerHeight: h } = window
      ctx.clearRect(0, 0, w, h)
      pointer.x += (pointer.targetX - pointer.x) * 0.05
      pointer.y += (pointer.targetY - pointer.y) * 0.05

      for (const mote of motes) {
        mote.y -= mote.rise
        mote.sway += mote.swaySpeed
        if (mote.y < -8) {
          mote.y = h + 8
          mote.x = Math.random() * w
        }

        const x = mote.x + Math.sin(mote.sway) * 9 + pointer.x * mote.depth
        const y = mote.y + pointer.y * mote.depth * 0.5
        // Slow twinkle so the field breathes instead of sitting static.
        const twinkle = 0.65 + Math.sin(mote.sway * 1.7) * 0.35

        ctx.beginPath()
        ctx.arc(x, y, mote.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(58, 50, 38, ${mote.alpha * twinkle})`
        ctx.fill()
      }

      if (!reduce) frame = window.requestAnimationFrame(draw)
    }

    function onPointerMove(event) {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 26
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 26
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

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />
}
