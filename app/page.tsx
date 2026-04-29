import type { ReactNode } from 'react'
import MettleBackground from './MettleBackground'
import RSVPSection from './RSVPSection'
import BikeGeometryDiagram from './BikeGeometryDiagram'
import HeadlineAutosize from './HeadlineAutosize'
import styles from './page.module.css'

const EVENT_DATE = 'May 12'
const EVENT_TIME = 'Time TBD'
const EVENT_LOCATION = 'High Haus'
const EVENT_LOCATION_URL = 'https://share.google/t5MrtQPmXCXskQrtN'

const AGENDA_ITEMS: Array<{ title: string; desc: ReactNode }> = [
  {
    title: 'Bike types and geometry',
    desc: "Road, gravel, and cyclocross bikes look similar until they don't. Frame geometry, wheel clearance, and intended use all shape how a bike rides, and which bike is right for your ride.",
  },
  {
    title: 'Frame materials',
    desc: "Carbon, steel, and aluminum. They do the same thing but do it differently. Each has real riding characteristics, cost tradeoffs, and a different relationship with road vibration and the repair bill.",
  },
  {
    title: 'Fit basics',
    desc: 'Most fit problems announce themselves as neck pain, hand numbness, or saddle discomfort. We will cover riding position fundamentals and how to know when a small adjustment fixes it.',
  },
  {
    title: 'Drivetrain types',
    desc: "Road 2x, gravel 1x, and wtf is a Campagnolo. Gear ratios explained and some general HALP! on the whole complicated system.",
  },
  {
    title: 'Drivetrain maintenance',
    desc: 'When and how to clean your chain, what products to use, and why waxed chains outlast traditional lube by a significant margin.',
  },
  {
    title: 'Tire talk',
    desc: "What pressure you running' bro? Probably higher than you need, bro. We will cover contact patches, rolling resistance, and how to pick the right tire for your terrain.",
  },
  {
    title: 'Adjustments and diagnosis',
    desc: <>Mechanical and electronic. How to diagnose indexing issues, correct disk brake rub, and recognize the difference between <em>needs adjustment</em> and <em>needs a shop</em>.</>,
  },
  {
    title: 'Pre-ride checks',
    desc: 'Two minutes before every ride. What to look for, what to feel for, and the three things that fail most often before they fail on you.',
  },
]

export default function Page() {
  return (
    <div className={styles.page}>
      <MettleBackground />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.maxWidth}>
          <HeadlineAutosize />
          <p className={styles.tagline}>
            An intro for cyclists who ride confidently and wrench...{' '}
            less&nbsp;so.{' '}
            <span className={styles.taglinePresenter}>Presented&nbsp;by&nbsp;Mettle&nbsp;Cycling</span>
          </p>
        </div>
      </section>

      {/* ── Intro + RSVP row ── */}
      <section className={styles.introRsvpSection}>
        <div className={styles.maxWidth}>
          <div className={styles.introRsvpGrid}>

            {/* Left: event intro */}
            <div className={`${styles.card} ${styles.introCard}`}>
              <p className={styles.cardHeading}>About the evening</p>
              <p className={styles.introBody}>
                One evening. Eight topics. The stuff you have wondered about but never prioritized.
                We will cover the fundamentals of your bike (how it is built, how it wears,
                and how to keep it running) without assuming you have been in a shop before.
              </p>
              <p className={styles.introBody}>
                Talk starts at 6:30. Come as early as 6. After we&apos;re done, we can address
                any issues with your bike applying what we learned; if we can&apos;t fix it,
                you&apos;ll know your next steps. I&apos;ll be selling{' '}
                <a
                  href="https://www.mettlecycling.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.inlineLink}
                >Mettle&nbsp;Merch</a>{' '}
                for big discounts as well. Bring a camp chair just in case. We&apos;ll have a few out.
              </p>
              <div className={styles.eventMetaCard}>
                <div className={styles.metaItem}>
                  <span className={styles.metaItemLabel}>Date</span>
                  <span className={styles.metaItemValue}>{EVENT_DATE}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaItemLabel}>Time</span>
                  <span className={styles.metaItemValue}>{EVENT_TIME}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaItemLabel}>Location</span>
                  <span className={styles.metaItemValue}>
                    <a
                      href={EVENT_LOCATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.metaLink}
                    >
                      📍 {EVENT_LOCATION}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: RSVP */}
            <RSVPSection />

          </div>
        </div>
      </section>

      {/* ── Agenda ── */}
      <section className={styles.section}>
        <div className={styles.maxWidth}>
          <p className={styles.sectionKicker}>The evening</p>
          <h2 className={styles.sectionHeading}>On the agenda</h2>
          <div className={styles.agendaGrid}>
            {AGENDA_ITEMS.map((item, i) => (
              <article key={i} className={styles.agendaCard}>
                <span className={styles.agendaNumber} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={styles.agendaTitle}>{item.title}</h3>
                <p className={styles.agendaDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bike anatomy diagram ── */}
      <section className={styles.diagramSection}>
        <div className={styles.maxWidth}>
          <h2 className={styles.sectionHeading}>Bike Geometry</h2>
          <BikeGeometryDiagram />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footerSection}>
        <div className={styles.maxWidth}>
          <div className={styles.footerLinks}>
            <a
              href="https://www.mettlecycling.com"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mettle&nbsp;Cycling
            </a>
            <span className={styles.footerDot} aria-hidden="true">·</span>
            <a
              href="/presentation/"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Take-home&nbsp;curriculum
            </a>
            <span className={styles.footerDot} aria-hidden="true">·</span>
            <span className={styles.footerMuted}>Syllabus coming soon</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
