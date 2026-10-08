import { useState } from 'react'
import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'

export function AgeConfirmation({ onContinue }: { onContinue: () => void }) {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <Frame eyebrow="FIRST, THE OBVIOUS PART" progress="02 / 06">
      <section className="standard-stage stage-enter">
        <div className="decorative-icon" aria-hidden="true">✳</div>
        <h1 className="stage-title">BEFORE<br />WE START<span className="period">.</span></h1>
        <p className="stage-description">Keep it fun. Keep it adult.</p>
        <label className={`confirm-card ${confirmed ? 'is-selected' : ''}`}>
          <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
          <span className="fake-checkbox" aria-hidden="true">{confirmed ? '✓' : ''}</span>
          <span>Everyone participating is 18 or older.</span>
        </label>
        <PrimaryButton onClick={onContinue} disabled={!confirmed} arrow>CONTINUE</PrimaryButton>
      </section>
    </Frame>
  )
}
