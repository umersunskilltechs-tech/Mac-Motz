import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

// Types a heading out once it scrolls into view. The full string is always in
// the DOM (invisible) so the line breaks are settled before typing starts —
// otherwise every heading would reflow the page as it grew.
export default function Typewriter({ text, as: Tag = 'span', className = '', speed = 30, delay = 120, ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return undefined
    let index = 0
    let interval
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1
        setCount(index)
        if (index >= text.length) window.clearInterval(interval)
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [inView, reduce, text, speed, delay])

  if (reduce) {
    return (
      <Tag ref={ref} className={className} {...rest}>
        {text}
      </Tag>
    )
  }

  const done = count >= text.length

  return (
    <Tag ref={ref} className={`relative ${className}`} aria-label={text} {...rest}>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {inView && !done && <span className="caret" />}
      </span>
    </Tag>
  )
}
