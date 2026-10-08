import { useState } from 'react'
import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Participant } from '../types/session'

function uniqueId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function ParticipantNames({ count, onComplete }: { count: number, onComplete: (people: Participant[]) => void }) {
  const [names, setNames] = useState<string[]>(() => Array(count).fill(''))
  const valid = names.every((name) => name.trim().length > 0)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!valid) return
    onComplete(names.map((name) => ({ id: uniqueId(), name: name.trim() })))
  }

  return (
    <Frame eyebrow="THE LINEUP" progress="04 / 06">
      <section className="names-stage stage-enter">
        <h1 className="stage-title">WHO'S<br />PLAYING<span className="period">?</span></h1>
        <p className="stage-description">First names or nicknames. That's all.</p>
        <form onSubmit={submit}>
          <div className="names-list">
            {names.map((name, index) => (
              <label className="name-field" key={index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <input
                  autoComplete="off"
                  maxLength={32}
                  value={name}
                  onChange={(event) => setNames((current) => current.map((entry, entryIndex) => entryIndex === index ? event.target.value : entry))}
                  placeholder={`Person ${index + 1}`}
                  aria-label={`Person ${index + 1} name or nickname`}
                />
              </label>
            ))}
          </div>
          <PrimaryButton type="submit" disabled={!valid} arrow>LET'S DO THIS</PrimaryButton>
        </form>
      </section>
    </Frame>
  )
}
