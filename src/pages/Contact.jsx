import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Eyebrow from '../components/Eyebrow'
import Footer from '../components/Footer'

const projectTypes = ['Editorial commission', 'Documentary project', 'Print or licensing inquiry', 'Exhibition or press', 'Other']

function Field({ id, label, type = 'text', required }) {
  return (
    <label htmlFor={id} className="block">
      <span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-4 w-full border-b border-paper/30 bg-transparent py-3 text-lg text-paper outline-none transition focus:border-accent"
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
    <section className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="mb-16 max-w-5xl">
        <Eyebrow>Contact / Commissions</Eyebrow>
        <h1 className="mt-5 font-display text-[14vw] leading-[.82] tracking-[-.06em] md:text-[9vw]">Let&rsquo;s make something.</h1>
      </div>

      <div className="grid gap-0 overflow-hidden rounded-3xl border border-paper/15 bg-panel md:grid-cols-12">
        <div className="border-b border-paper/15 p-7 md:col-span-4 md:border-b-0 md:border-r md:p-10">
          <Eyebrow>Inquiries &amp; collaborations</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[.95] tracking-[-.05em] md:text-5xl">
            Begin a conversation.
          </h2>
          <p className="mt-8 max-w-sm text-paper/70">
            For commissions, exhibitions, licensing, and all other questions, use the form or email directly.
          </p>
          <a href="mailto:hello@macmotz.com" className="mt-8 block font-mono text-[10px] uppercase tracking-[.15em] text-accent">
            hello@macmotz.com &#8599;
          </a>
          <div className="mt-16 border-t border-paper/15 pt-6 font-mono text-[9px] uppercase leading-loose tracking-[.15em] text-muted">
            <p>Based in the United States</p>
            <p>Available worldwide</p>
            <p className="mt-3 text-paper/75">Typical reply / 1&ndash;2 days</p>
          </div>
        </div>

        <div className="p-7 md:col-span-8 md:p-10 lg:p-14">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="border-y border-paper/20 py-16"
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
                  <span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted">Project type</span>
                  <select
                    id="project-type"
                    name="project-type"
                    required
                    defaultValue=""
                    className="mt-4 w-full border-b border-paper/30 bg-transparent py-3 text-lg text-paper outline-none transition focus:border-accent"
                  >
                    <option value="" disabled>
                      Select one&hellip;
                    </option>
                    {projectTypes.map((option) => (
                      <option key={option} value={option} className="bg-ink text-paper">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="message" className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted">Message</span>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    rows="4"
                    className="mt-4 w-full resize-none border-b border-paper/30 bg-transparent py-3 text-paper outline-none transition focus:border-accent"
                  />
                </label>
                <button
                  type="submit"
                  className="group inline-flex items-center gap-5 font-mono text-[10px] uppercase tracking-[.17em] text-accent"
                >
                  Send inquiry <span className="text-xl transition group-hover:translate-x-2">&rarr;</span>
                </button>
                <p className="font-mono text-[9px] uppercase tracking-[.12em] text-muted">
                  Demo form: no message is sent yet. Connect a real endpoint (Formspree, Basin, or a custom API) before
                  launch.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
    <section className="border-y border-paper/20 px-5 py-20 md:px-10 md:py-28">
      <Eyebrow>How it works</Eyebrow>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-paper/20 md:grid-cols-4">
        {[
          ['01', 'Brief', 'Share the assignment, audience, location, and timing.'],
          ['02', 'Align', 'We shape the visual approach, scope, and production plan.'],
          ['03', 'Create', 'The work is photographed with a quiet, observational process.'],
          ['04', 'Deliver', 'Final selects arrive edited, organized, and ready for use.'],
        ].map(([number, title, copy]) => (
          <div key={number} className="bg-ink p-6 md:min-h-56 md:p-8">
            <span className="font-mono text-[10px] text-accent">{number}</span>
            <h2 className="mt-12 font-display text-3xl">{title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-paper/60">{copy}</p>
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </>
  )
}
