import MettleBackground from './MettleBackground'
import styles from './wrenching101.module.css'

const agenda = [
  'Basic bike terminology',
  'Parts and frame geometry',
  'Bike types, brands, and use cases',
  'Tire setup and pressure basics',
  'Drivetrain types: 1x, 2x, wireless, mechanical',
  'Frame materials: steel, carbon, aluminum',
  'Tubeless vs. tubed setups',
  'On-bike accessories and backup kits',
]

const parts = [
  'Frame',
  'Fork',
  'Hydraulic disc brake',
  'Rotor',
  'Cassette',
  'Chain',
  'Rear derailleur',
  'Crankset',
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
            A welcoming intro night for learning bike parts, common setups, and the language that makes
            maintenance less mysterious.
          </p>
          <p className={styles.heroMeta}>May 5, 2026 / 6:30 PM MDT / 252 Peakview Road, Boulder, CO 80302</p>
        </div>
      </section>

      <section className={styles.infoGrid} aria-label="Event overview">
        <article className={styles.overview} aria-labelledby="overview-title">
          <p className={styles.kicker}>Overview</p>
          <h2 id="overview-title">Learn the parts before fixing the problem.</h2>
          <p>
            The evening starts with accurate part recognition: what you are looking at, what it does,
            how similar systems differ, and which terms matter when asking for help.
          </p>
          <a href="/syllabus.pdf" aria-disabled="true">Download syllabus soon</a>
        </article>

        <article className={styles.panel}>
          <p className={styles.kicker}>Evening agenda</p>
          <h2>What we&apos;ll cover</h2>
          <ol className={styles.agendaList}>
            {agenda.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className={styles.panel}>
          <p className={styles.kicker}>Diagram system</p>
          <h2>Parts to identify first</h2>
          <div className={styles.partColumns}>
            <ul className={styles.partList}>
              {parts.slice(0, 4).map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
            <ul className={styles.partList}>
              {parts.slice(4).map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className={styles.rsvpRow} aria-labelledby="rsvp-title">
        <div className={styles.rsvpCard}>
          <div className={styles.rsvpIntro}>
            <p className={styles.kicker}>RSVP</p>
            <h2 id="rsvp-title">Let us know if you&apos;re coming.</h2>
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

        <div className={styles.goingSection}>
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

      <section className={styles.schematic} aria-label="Stylized bike schematic preview">
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
          <h2>Bike anatomy, highlighted piece by piece.</h2>
          <p>Final diagrams will use accurate drivetrain, brake, frame, and wheel-system references.</p>
        </div>
      </section>
    </main>
  )
}
