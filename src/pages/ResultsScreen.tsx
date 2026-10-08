import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Match } from '../types/session'

export function ResultsScreen({ participantCount, matches, onStartOver }: {
  participantCount: number
  matches: Match[]
  onStartOver: () => void
}) {
  const isTwoPerson = participantCount === 2
  const success = matches.length > 0
  return (
    <Frame eyebrow="THE VERDICT" progress="06 / 06">
      <section className={`results-stage stage-enter ${success ? 'has-match' : 'no-match'}`}>
        <div className="result-symbol" aria-hidden="true">{success ? '✳' : '×'}</div>
        <p className="overline">AND THE ANSWER IS...</p>
        <h1 className="result-title">{success ? 'SEX' : <>NO<br />SEX</>}<span className="period">.</span></h1>
        <p className="result-emoji" aria-hidden="true">{success ? '🔥' : '💀'}</p>
        {isTwoPerson ? (
          <p className="result-caption">{success ? 'No need to make this complicated.' : 'Well, there you have it.'}</p>
        ) : success ? (
          <div className="match-list" aria-label="Mutual matches">
            <p className="list-label">MUTUAL YES PAIRS</p>
            {matches.map(({ first, second }) => (
              <div className="match-row" key={`${first.id}-${second.id}`}><span>{first.name}</span><span className="match-plus">+</span><span>{second.name}</span></div>
            ))}
          </div>
        ) : <p className="result-caption">Tough crowd.</p>}
        <p className="consent-note">SEX means everyone privately answered yes. Anyone can still change their mind at any time.</p>
        <PrimaryButton onClick={onStartOver} variant="outline" arrow>START OVER</PrimaryButton>
      </section>
    </Frame>
  )
}
