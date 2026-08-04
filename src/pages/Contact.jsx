import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Eyebrow from '../components/Eyebrow'
import Footer from '../components/Footer'

const projectTypes = [
  'Editorial commission',
  'Documentary project',
  'Print or licensing inquiry',
  'Exhibition or press',
  'Other',
]

function Field({ id, label, type = 'text', required }) {
  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[10px] uppercase tracking-[.16em] text-sub">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-4 w-full border-b border-ink/25 bg-transparent py-3 text-lg text-ink outline-none transition focus:border-accent"
      />
    </label>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  function submit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    // Demo-only: no request is sent. Wire this up to a real endpoint
    // (Formspree, Basin, or a custom API route) before launch.
    setSent(true)
    form.reset()
  }

  return (
    <>
      <section className="px-5 pt-32 pb-28 md:px-10 md:pt-44">
        <div className="mb-16 max-w-5xl">
          <Eyebrow>Contact / Commissions</Eyebrow>
          <h1 className="mt-5 font-display text-[14vw] leading-[.84] tracking-[-.06em] md:text-[9vw]">
            Let&rsquo;s make something.
          </h1>
        </div>

        <div className="grid gap-12 border-t border-ink/15 pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="max-w-sm text-lg leading-relaxed text-ink/75">
              For commissions, exhibitions, licensing, and all other questions, use the form or email directly. No
              packages, no fixed pricing — every project is quoted to its brief.
            </p>
            <a
              href="mailto:hello@macmotz.com"
              className="mt-8 block font-mono text-[10px] uppercase tracking-[.18em] text-accent"
            >
              hello@macmotz.com &#8599;
            </a>
            <div className="mt-14 border-t border-ink/15 pt-6 font-mono text-[9px] uppercase leading-loose tracking-[.15em] text-sub">
              <p>Based in the United States</p>
              <p>Available worldwide</p>
              <p className="mt-3 text-ink/75">Typical reply / 1&ndash;2 days</p>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="border-y border-ink/15 py-16"
                  role="status"
                >
                  <Eyebrow>Message prepared</Eyebrow>
                  <p className="mt-5 font-display text-4xl">Thank you. Mac will be in touch soon.</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-10 font-mono text-[10px] uppercase tracking-[.15em] text-accent"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={submit}
                  noValidate
                  className="space-y-9"
                >
                  <Field id="name" label="Name" required />
                  <Field id="email" label="Email" type="email" required />
                  <label htmlFor="project-type" className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[.16em] text-sub">Project type</span>
                    <select
                      id="project-type"
                      name="project-type"
                      required
                      defaultValue=""
                      className="mt-4 w-full border-b border-ink/25 bg-transparent py-3 text-lg text-ink outline-none transition focus:border-accent"
                    >
                      <option value="" disabled>
                        Select one&hellip;
                      </option>
                      {projectTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="message" className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[.16em] text-sub">Message</span>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      rows="4"
                      className="mt-4 w-full resize-none border-b border-ink/25 bg-transparent py-3 text-ink outline-none transition focus:border-accent"
                    />
                  </label>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-5 font-mono text-[10px] uppercase tracking-[.17em] text-accent"
                  >
                    Send inquiry <span className="text-xl transition group-hover:translate-x-2">&rarr;</span>
                  </button>
                  <p className="font-mono text-[9px] uppercase tracking-[.12em] text-sub">
                    Demo form: no message is sent yet. Connect a real endpoint (Formspree, Basin, or a custom API)
                    before launch.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
