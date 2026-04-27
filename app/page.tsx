import MettleBackground from './MettleBackground'
import RSVPSection from './RSVPSection'
import BikeGeometryDiagram from './BikeGeometryDiagram'
import styles from './page.module.css'

const EVENT_DATE = 'May 12'
const EVENT_TIME = 'Time TBD'
const EVENT_LOCATION = 'Location TBD'

const AGENDA_ITEMS = [
  {
    title: 'Bike types and geometry',
    desc: 'Road, gravel, and cyclocross bikes look similar until they don\'t. Frame geometry, wheel clearance, and intended use all shape how a bike rides, and which one is right for yours.',
  },
  {
    title: 'Frame materials',
    desc: 'Carbon, steel, and aluminum aren\'t just marketing language. Each has real riding characteristics, cost tradeoffs, and a different relationship with road vibration and the repair bill.',
  },
  {
    title: 'Fit basics',
    desc: 'Most fit problems announce themselves as neck pain, hand numbness, or saddle discomfort. We will cover riding position fundamentals and how to know when a small adjustment fixes it.',
  },
  {
    title: 'Drivetrain types',
    desc: 'Road 2x, gravel 1x, and everything in between. Gear ratios explained in terms of what actually matters on a climb, or out of one.',
  },
  {
    title: 'Drivetrain maintenance',
    desc: 'When and how to clean your chain, what products to use, and why waxed chains outlast traditional lube by a significant margin.',
  },
  {
    title: 'Tire talk',
    desc: 'Counterintuitively, wider tires roll faster. We will cover contact patches, rolling resistance, and how to pick the right tire for your terrain.',
  },
  {
    title: 'Adjustments and diagnosis',
    desc: 'Mechanical and electronic. How to diagnose indexing issues, trim a brake, and recognize the difference between needs adjustment and needs a shop.',
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
          <h1 className={styles.headline}>
            <span className={styles.titleText}>Wrenching 101</span>
            <span className={styles.titleShadowStrong} aria-hidden="true">Wrenching 101</span>
            <span className={styles.titleShadowSoft} aria-hidden="true">Wrenching 101</span>
          </h1>
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
                  <span className={styles.metaItemValue}>{EVENT_LOCATION}</span>
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
          <p className={styles.sectionKicker}>Bike anatomy</p>
          <h2 className={styles.sectionHeading}>Interactive frame diagram</h2>
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
            <span className={styles.footerMuted}>Take-home curriculum</span>
            <span className={styles.footerDot} aria-hidden="true">·</span>
            <span className={styles.footerMuted}>Syllabus coming soon</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
