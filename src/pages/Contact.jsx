import { AnimatePresence, motion } from 'motion/react'
import { useForm, ValidationError } from '@formspree/react'
import Eyebrow from '../components/Eyebrow'
import Typewriter from '../components/Typewriter'
import Reveal from '../components/Reveal'
import Footer from '../components/Footer'

const projectTypes = [
  'Editorial commission',
  'Documentary project',
  'Print or licensing inquiry',
  'Exhibition or press',
  'Other',
]

const fieldClass =
  'mt-4 w-full border-b border-ink/25 bg-transparent py-3 text-lg text-ink outline-none transition focus:border-accent'

// Fields are numbered to match the rest of the site's mono-metadata language.
function Field({ number, id, label, type = 'text', required, formState }) {
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-sub">
        <span className="text-accent tabular-nums">{number}</span>
        {label}
      </span>
      <input id={id} name={id} type={type} required={required} className={fieldClass} />
      <ValidationError
        prefix={label}
        field={id}
        errors={formState.errors}
        className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-accent"
      />
    </label>
  )
}

export default function Contact() {
  const [formState, handleSubmit, resetForm] = useForm('xgawalok')
  const sent = formState.succeeded

  return (
    <>
      <section className="px-5 pt-32 pb-24 md:px-10 md:pt-44">
        <div className="max-w-5xl">
          <Reveal>
            <Eyebrow>Contact / Commissions</Eyebrow>
          </Reveal>
          <Typewriter
            as="h1"
            text="Let’s make something."
            speed={70}
            delay={320}
            className="mt-5 block font-display text-[14vw] leading-[.84] tracking-[-.06em] md:text-[9vw]"
          />
        </div>

        <div className="mt-16 grid gap-12 border-t border-ink/15 pt-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4 md:sticky md:top-28 md:self-start">
            <p className="font-display text-4xl leading-none tracking-[-.03em]">Get in touch</p>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/75">
              For commissions, exhibitions, licensing, and all other questions, use the form or email directly.
              No packages, no fixed pricing — every project is quoted to its brief.
            </p>
            <a
              href="mailto:hello@macmotz.com"
              className="mt-8 block font-mono text-[10px] uppercase tracking-[.18em] text-accent transition hover:text-ink"
            >
              hello@macmotz.com &#8599;
            </a>
            <dl className="mt-12 space-y-3 border-t border-ink/15 pt-6 font-mono text-[9px] uppercase tracking-[.15em] text-sub">
              <div className="flex justify-between gap-4">
                <dt>Based</dt>
                <dd className="text-ink/75">United States</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Travels</dt>
                <dd className="text-ink/75">Worldwide</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Reply</dt>
                <dd className="text-ink/75">1&ndash;2 days</dd>
              </div>
            </dl>
          </Reveal>

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
                    onClick={resetForm}
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
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  <Reveal>
                    <Field number="01" id="name" label="Name" required formState={formState} />
                  </Reveal>
                  <Reveal delay={0.06}>
                    <Field number="02" id="email" label="Email" type="email" required formState={formState} />
                  </Reveal>
                  <Reveal delay={0.12}>
                    <label htmlFor="project-type" className="block">
                      <span className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-sub">
                        <span className="text-accent tabular-nums">03</span>
                        Project type
                      </span>
                      <select id="project-type" name="project-type" required defaultValue="" className={fieldClass}>
                        <option value="" disabled>
                          Select one&hellip;
                        </option>
                        {projectTypes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ValidationError
                        prefix="Project type"
                        field="project-type"
                        errors={formState.errors}
                        className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-accent"
                      />
                    </label>
                  </Reveal>
                  <Reveal delay={0.18}>
                    <label htmlFor="message" className="block">
                      <span className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-sub">
                        <span className="text-accent tabular-nums">04</span>
                        Message
                      </span>
                      <textarea
                        id="message"
                        name="message"
                        required
                        minLength={10}
                        rows="4"
                        className={`${fieldClass} resize-none`}
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={formState.errors}
                        className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-accent"
                      />
                    </label>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <button
                      type="submit"
                      disabled={formState.submitting}
                      className="group inline-flex items-center gap-5 border-b border-accent pb-2 font-mono text-[10px] uppercase tracking-[.17em] text-accent transition hover:border-ink hover:text-ink disabled:opacity-50"
                    >
                      {formState.submitting ? 'Sending…' : 'Send inquiry'}{' '}
                      <span className="text-xl transition group-hover:translate-x-2">&rarr;</span>
                    </button>
                  </Reveal>
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
