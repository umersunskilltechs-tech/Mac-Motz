import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Eyebrow from '../components/Eyebrow'

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
    <section className="px-5 pb-28 pt-36 md:px-10 md:pt-44">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow>Inquiries &amp; collaborations</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.05em] md:text-7xl">
            Begin a conversation.
          </h1>
          <p className="mt-8 max-w-sm text-paper/70">
            For commissions, exhibitions, licensing, and all other questions, use the form or email directly.
          </p>
          <a href="mailto:hello@macmotz.com" className="mt-8 block font-mono text-[10px] uppercase tracking-[.15em] text-accent">
            hello@macmotz.com &#8599;
          </a>
        </div>

        <div className="md:col-span-7 md:col-start-6">
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
  )
}
