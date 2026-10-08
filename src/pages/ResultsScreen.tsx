import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Participant } from '../types/session'

export function ResultsScreen({ participantCount, partners, onDone, isLast }: {
  participantCount: number
  partners: Participant[]
  onDone: () => void
  isLast: boolean
}) {
  const isTwoPerson = participantCount === 2
  const success = partners.length > 0
  return (
    <Frame eyebrow="YOUR PRIVATE RESULT" progress="FOR YOUR EYES ONLY">
      <section className={`results-stage stage-enter ${success ? 'has-match' : 'no-match'}`}>
        <div className="result-symbol" aria-hidden="true">{success ? '✳' : '×'}</div>
        <p className="overline">YOUR RESULT</p>
        <h1 className="result-title">{success ? 'SEX' : <>NO<br />SEX</>}<span className="period">.</span></h1>
        <p className="result-emoji" aria-hidden="true">{success ? '🔥' : '💀'}</p>
        {isTwoPerson ? (
          <p className="result-caption">{success ? 'No need to make this complicated.' : 'Well, there you have it.'}</p>
        ) : success ? (
          <div className="match-list" aria-label="Your mutual matches">
            <p className="list-label">YOUR MUTUAL YES {partners.length === 1 ? 'MATCH' : 'MATCHES'}</p>
            {partners.map((partner) => (
              <div className="match-row" key={partner.id}><span>{partner.name}</span></div>
            ))}
          </div>
        ) : <p className="result-caption">Tough crowd.</p>}
        <p className="consent-note">SEX means everyone privately answered yes. Anyone can still change their mind at any time.</p>
        <PrimaryButton onClick={onDone} variant="outline" arrow>{isLast ? 'HIDE MY RESULT' : 'HIDE & PASS PHONE'}</PrimaryButton>
      </section>
    </Frame>
  )
}
