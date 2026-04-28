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
      const label = status === 'going' ? 'Going' : 'Not going'
      const subject = encodeURIComponent(`Wrenching 101 RSVP: ${name.trim()}, ${label}`)
      const emailBody = encodeURIComponent(`${name.trim()} — ${label}`)
      window.open(`mailto:randall@mettlecycling.com?subject=${subject}&body=${emailBody}`)
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
            disabled={loading}
          >
            {loading ? 'Sending' : 'Send response'}
          </button>
        </form>
      )}

      <div className={styles.listDivider} />

      <p className={styles.attendeeCount}>
        {going.length === 0
          ? 'No responses yet'
          : `${going.length} of 16 cyclist${going.length === 1 ? '' : 's'} going`}
      </p>

      <div className={styles.attendeeGrid} aria-label="Attending">
        {Array.from({ length: 16 }, (_, i) => {
          const r = going[i]
          return (
            <div key={i} className={styles.attendeeSlot}>
              {r && (
                <span className={styles.attendeeItem}>{r.name}</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
