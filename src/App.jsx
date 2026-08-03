import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

const work = [
  { number: '01', title: 'Interstate', place: 'I-70, 2024', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=85', span: 'md:col-span-7', tone: 'from-[#32251d]/50' },
  { number: '02', title: 'Low Country', place: 'Beaufort, 2023', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85', span: 'md:col-span-5', tone: 'from-[#27312b]/45' },
  { number: '03', title: 'Vacancy', place: 'Tucson, 2022', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85', span: 'md:col-span-5', tone: 'from-[#35271e]/45' },
  { number: '04', title: 'Kin', place: 'Kentucky, 2024', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=85', span: 'md:col-span-7', tone: 'from-[#292822]/45' },
]

const reveal = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }

  return <main className="overflow-hidden bg-ink text-paper selection:bg-acid selection:text-ink">
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
      <a href="#top" className="font-mono text-[11px] uppercase tracking-[.22em]">Mac Motz</a>
      <nav className="hidden gap-8 font-mono text-[10px] uppercase tracking-[.18em] md:flex">
        <a href="#work" className="hover:text-acid">Work</a><a href="#about" className="hover:text-acid">About</a><a href="#contact" className="hover:text-acid">Contact</a>
      </nav>
      <button className="font-mono text-[10px] uppercase tracking-[.18em] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 grid place-content-center gap-7 bg-ink text-center font-display text-5xl" onClick={() => setMenuOpen(false)}><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></motion.nav>}</AnimatePresence>

    <section id="top" className="relative min-h-screen px-5 pt-28 md:px-10">
      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.13 } } }} className="relative z-10 flex min-h-[calc(100vh-7rem)] flex-col justify-between">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[.18em] text-paper/60"><span>Selected photographs</span><span>2018—2026</span></div>
        <div className="max-w-6xl"><motion.p variants={reveal} transition={transition} className="mb-6 font-mono text-[10px] uppercase tracking-[.2em] text-acid">American studies / 06 series</motion.p><motion.h1 variants={reveal} transition={transition} className="font-display text-[18vw] leading-[.78] tracking-[-.07em] md:text-[13vw]">The distance<br/>between places.</motion.h1></div>
        <motion.div variants={reveal} transition={transition} className="flex items-end justify-between border-t border-paper/25 pt-4 font-mono text-[10px] uppercase tracking-[.18em]"><span>Scroll to enter</span><span className="text-right text-paper/55">Field notes in light<br/>&amp; landscape</span></motion.div>
      </motion.div>
      <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} transition={{ ...transition, delay: 0.15, duration: reduceMotion ? 0 : 1.4 }} className="absolute inset-x-0 bottom-0 h-[45vh] bg-[url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=85')] bg-cover bg-center opacity-45"><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" /></motion.div>
    </section>

    <section id="work" className="px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 flex items-end justify-between"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-acid">01—04 / Current work</p><p className="hidden max-w-48 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[.14em] text-paper/55 md:block">A record of weather, crossings, and the things left behind.</p></div>
      <div className="grid gap-x-5 gap-y-20 md:grid-cols-12 md:gap-y-32">{work.map((item, index) => <WorkCard key={item.title} item={item} index={index} reduceMotion={reduceMotion} />)}</div>
    </section>

    <section id="about" className="border-y border-paper/20 px-5 py-28 md:px-10 md:py-40"><div className="grid gap-12 md:grid-cols-12"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-acid md:col-span-3">A practice of looking</p><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal} transition={transition} className="md:col-span-8"><p className="font-display text-4xl leading-[1.03] tracking-[-.04em] md:text-7xl">Mac Motz makes photographs around the edges of ordinary life: places passed through, rooms emptied, family gathered at the end of the day.</p><a href="mailto:hello@macmotz.com" className="mt-12 inline-flex border-b border-acid pb-2 font-mono text-[10px] uppercase tracking-[.2em] text-acid hover:text-paper">Read the full note ↗</a></motion.div></div></section>

    <section id="contact" className="relative px-5 py-32 md:px-10 md:py-44"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-acid">Let’s make something</p><motion.a whileHover={reduceMotion ? {} : { x: 10 }} href="mailto:hello@macmotz.com" className="mt-7 block font-display text-[13vw] leading-[.82] tracking-[-.07em] md:text-[10vw]">Start a<br/>conversation <span className="text-acid">↗</span></motion.a><footer className="mt-28 flex flex-col justify-between gap-5 border-t border-paper/20 pt-5 font-mono text-[10px] uppercase tracking-[.15em] text-paper/55 md:flex-row"><span>© 2026 Mac Motz</span><span>Made with patience</span><a href="#top" className="hover:text-paper">Back to top ↑</a></footer></section>
  </main>
}

function WorkCard({ item, index, reduceMotion }) {
  return <motion.article initial={{ opacity: 0, y: reduceMotion ? 0 : 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduceMotion ? 0 : .85, delay: reduceMotion ? 0 : index * .08, ease: [0.16, 1, 0.3, 1] }} className={item.span}>
    <a href="#contact" className="group block"><div className="relative aspect-[4/5] overflow-hidden bg-paper/10"><img src={item.image} alt={`${item.title}, ${item.place}`} className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"/><div className={`absolute inset-0 bg-gradient-to-t ${item.tone} to-transparent mix-blend-multiply`} /><span className="absolute left-4 top-4 font-mono text-[10px] tracking-[.16em]">{item.number}</span><span className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[.16em] opacity-0 transition group-hover:opacity-100">VIEW SERIES ↗</span></div><div className="mt-4 flex items-baseline justify-between"><h2 className="font-display text-3xl tracking-[-.04em]">{item.title}</h2><p className="font-mono text-[10px] uppercase tracking-[.14em] text-paper/55">{item.place}</p></div></a>
  </motion.article>
}

export default App
