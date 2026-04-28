'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

type RSVPEntry = {
  name: string
  status: 'going' | 'not-going'
  timestamp: number
}

export default function RSVPSection() {
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'going' | 'not-going' | ''>('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([])

  const going = rsvps.filter(r => r.status === 'going')
  const notGoing = rsvps.filter(r => r.status === 'not-going')

  async function fetchRsvps() {
    try {
      const res = await fetch('/api/rsvp')
      if (res.ok) setRsvps(await res.json())
    } catch { /* silent */ }
  }

  useEffect(() => { fetchRsvps() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Name is required.'); return }
    if (!status) { setError('Select going or not going.'); return }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), status }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      await fetchRsvps()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.card}>
      <p className={styles.cardHeading}>RSVP</p>

      {submitted ? (
        <p className={styles.confirmation}>
          {status === 'going'
            ? "You are on the list. See you May 12."
            : "Got it. Maybe next time."}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="rsvp-name">
              Your name
            </label>
            <input
              id="rsvp-name"
              type="text"
              className={styles.input}
              placeholder="First and last"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className={styles.formGroup}>
            <fieldset style={{ border: 'none', padding: 0 }}>
              <legend className={styles.formLabel}>Attending?</legend>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rsvp-status"
                    value="going"
                    checked={status === 'going'}
                    onChange={() => setStatus('going')}
                  />
                  Going
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="rsvp-status"
                    value="not-going"
                    checked={status === 'not-going'}
                    onChange={() => setStatus('not-going')}
                  />
                  Not going
                </label>
              </div>
            </fieldset>
          </div>

          {error && <p className={styles.formError} role="alert">{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled
          >
            Send response
          </button>
        </form>
      )}

      <div className={styles.listDivider} />

      <div className={styles.rsvpTwoCol}>
        <div className={styles.rsvpColGroup}>
          <p className={styles.rsvpColHeader}>ATTENDING</p>
          {going.map((r, i) => (
            <span key={i} className={styles.attendeeItem}>{r.name}</span>
          ))}
        </div>
        <div className={styles.rsvpColGroup}>
          <p className={styles.rsvpColHeader}>NOT ATTENDING</p>
          {notGoing.map((r, i) => (
            <span key={i} className={styles.attendeeItem}>{r.name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
