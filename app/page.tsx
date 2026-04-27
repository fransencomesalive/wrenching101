import MettleBackground from './MettleBackground'
import styles from './wrenching101.module.css'

const agenda = [
  'Geometry — what the numbers mean and why two bikes feel completely different',
  'The drivetrain — chain, cassette, derailleur, and why they wear out as a team',
  'Tire talk — pressure, TPI, size, tubeless vs. tubed, and why everyone has a take',
  'Frame materials — the real trade-offs between steel, aluminum, and carbon',
  'Tools you should carry and the ones that actually save you',
]

const responses = [
  { name: 'Randall', status: 'attending' },
  { name: 'Mettle crew', status: 'attending' },
  { name: 'TBD guest', status: 'not attending' },
]

export default function Wrenching101Page() {
  return (
    <main className={styles.page}>
      <MettleBackground />

      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="event-title">
          <div className={styles.inviteBlock}>
            <div className={styles.titleBlock}>
              <h1 id="event-title" aria-label="Wrenching 101">
                <span className={styles.titleShadowStrong} aria-hidden="true">Wrenching 101</span>
                <span className={styles.titleShadowSoft} aria-hidden="true">Wrenching 101</span>
                <span className={styles.titleText}>Wrenching 101</span>
              </h1>
              <p className={styles.heroCredit}>Hosted by Mettle Cycling</p>
            </div>
            <p className={styles.summary}>
              An intro for cyclists who ride confidently and wrench... less so.
              Parts, maintenance, and the logic behind all of it — explained without the condescension.
            </p>
            <p className={styles.heroMeta}>May 5, 2026 / 6:30 PM MDT / 252 Peakview Road, Boulder, CO 80302</p>
          </div>
        </section>

        <section className={styles.infoGrid} aria-label="Event overview">
          <article className={`${styles.card} ${styles.infoCard}`} aria-labelledby="overview-title">
            <div className={styles.cardHeader}>
              <p className={styles.kicker}>The plan</p>
              <h2 id="overview-title" className={styles.h2Card}>Here&apos;s what tonight actually is.</h2>
            </div>
            <p className={styles.cardBody}>
              Two hours of parts, systems, and maintenance logic. No prior knowledge required — just
              curiosity and, ideally, a bike you&apos;ve been confused by. Food will be on hand, and Mettle
              gear will be available if anything catches your eye. Stay for all of it, or head out when
              it works for you.
            </p>
            <span className={styles.comingSoon}>Syllabus coming soon</span>
          </article>

          <article className={`${styles.card} ${styles.infoCard}`} aria-labelledby="agenda-title">
            <div className={styles.cardHeader}>
              <p className={styles.kicker}>Evening agenda</p>
              <h2 id="agenda-title" className={styles.h2Card}>What we&apos;ll cover</h2>
            </div>
            <ol className={styles.listNumbered}>
              {agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </article>

          <article className={`${styles.card} ${styles.infoCard}`} aria-labelledby="discussion-title">
            <div className={styles.cardHeader}>
              <p className={styles.kicker}>To close the night</p>
              <h2 id="discussion-title" className={styles.h2Card}>Questions, stories, and the stuff nobody asked on Google.</h2>
            </div>
            <p className={styles.cardBody}>
              The last part of the evening is yours. Bring a repair you&apos;ve been avoiding, a question
              you&apos;ve been embarrassed to ask, or a story about the time something went catastrophically
              wrong. We&apos;ll share, diagnose, and commiserate. No correct answers required.
            </p>
          </article>
        </section>

        <section className={styles.rsvpRow} aria-labelledby="rsvp-title">
          <div className={`${styles.card} ${styles.rsvpCard}`}>
            <div className={styles.cardHeader}>
              <p className={styles.kicker}>RSVP</p>
              <h2 id="rsvp-title" className={styles.h2Rsvp}>Let us know if you&apos;re coming.</h2>
            </div>
            <form className={styles.rsvpForm}>
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" />
              </label>
              <div className={styles.choiceRow} aria-label="Attendance">
                <label>
                  <input type="radio" name="status" value="attending" defaultChecked />
                  Attending
                </label>
                <label>
                  <input type="radio" name="status" value="not-attending" />
                  Not attending
                </label>
              </div>
              <button type="button">Send response</button>
            </form>
          </div>

          <div className={`${styles.card} ${styles.goingSection}`}>
            <div className={styles.cardHeader}>
              <p className={styles.kicker}>Who&apos;s coming</p>
              <h2 className={styles.h2Rsvp}>Responses so far</h2>
            </div>
            <div className={styles.goingCard}>
              <p className={styles.kicker}>Attending</p>
              <ul>
                {responses
                  .filter((r) => r.status === 'attending')
                  .map((r) => <li key={r.name}>{r.name}</li>)}
              </ul>
            </div>
            <div className={styles.goingCard}>
              <p className={styles.kicker}>Not attending</p>
              <ul>
                {responses
                  .filter((r) => r.status !== 'attending')
                  .map((r) => <li key={r.name}>{r.name}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.schematic} aria-label="Bike schematic preview">
          <div className={styles.scopeRing} />
          <div className={styles.bikeLine}>
            <span className={styles.wheelFront} />
            <span className={styles.wheelRear} />
            <span className={styles.frameTop} />
            <span className={styles.frameDown} />
            <span className={styles.frameSeat} />
            <span className={styles.bar} />
            <span className={styles.drivetrain} />
          </div>
          <div className={styles.schematicCopy}>
            <p className={styles.kicker}>Interactive schematic</p>
            <h2 className={styles.h2Schematic}>Bike anatomy, highlighted piece by piece.</h2>
            <p className={styles.schematicBody}>Final diagrams will use accurate drivetrain, brake, frame, and wheel system references.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
