import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'

export function CompleteScreen({ onStartOver }: { onStartOver: () => void }) {
  return (
    <Frame eyebrow="ALL RESULTS VIEWED" progress="DONE">
      <section className="standard-stage stage-enter">
        <div className="decorative-icon" aria-hidden="true">✓</div>
        <h1 className="stage-title">THAT'S<br />EVERYONE<span className="period">.</span></h1>
        <p className="stage-description">The private results are gone.</p>
        <PrimaryButton onClick={onStartOver} arrow>START OVER</PrimaryButton>
      </section>
    </Frame>
  )
}
