import { useState } from 'react'
import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'

export function ParticipantCount({ onNext }: { onNext: (count: number) => void }) {
  const [count, setCount] = useState(2)
  return (
    <Frame eyebrow="SET THE SCENE" progress="03 / 06">
      <section className="standard-stage stage-enter">
        <div className="decorative-icon" aria-hidden="true">↗</div>
        <h1 className="stage-title">HOW MANY<br />PEOPLE<span className="period">?</span></h1>
        <p className="stage-description">One phone. Everyone gets a private turn.</p>
        <div className="count-control" aria-label="Number of participants">
          <button aria-label="Remove one person" disabled={count <= 2} onClick={() => setCount((value) => value - 1)}>−</button>
          <output aria-live="polite" aria-label={`${count} people`}>{count}</output>
          <button aria-label="Add one person" disabled={count >= 50} onClick={() => setCount((value) => value + 1)}>+</button>
        </div>
        <p className="control-caption">2 TO 50 PEOPLE</p>
        <PrimaryButton onClick={() => onNext(count)} arrow>NEXT</PrimaryButton>
      </section>
    </Frame>
  )
}
