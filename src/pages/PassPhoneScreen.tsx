import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Participant } from '../types/session'

export function PassPhoneScreen({ participant, turn, total, onReady }: {
  participant: Participant
  turn: number
  total: number
  onReady: () => void
}) {
  return (
    <Frame eyebrow="PASS THE PHONE" progress={`${turn} / ${total} TURNS`}>
      <section className="standard-stage pass-stage stage-enter">
        <div className="privacy-orbit" aria-hidden="true"><span>↗</span></div>
        <p className="overline">UP NEXT</p>
        <h1 className="stage-title name-title">{participant.name.toLocaleUpperCase()}'S<br />TURN<span className="period">.</span></h1>
        <p className="stage-description">Give {participant.name} the phone.<br />Everyone else, look away 👀</p>
        <PrimaryButton onClick={onReady} arrow>I'M {participant.name.toLocaleUpperCase()}</PrimaryButton>
        <p className="microcopy">Answers stay private until everyone is done.</p>
      </section>
    </Frame>
  )
}
