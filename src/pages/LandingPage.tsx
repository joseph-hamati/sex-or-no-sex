import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'

export function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <Frame eyebrow="THE VERY DIRECT PARTY GAME" progress="01 / 06">
      <section className="landing stage-enter">
        <div className="hero-copy">
          <h1 className="hero-title">SEX <span>OR</span><br />NO SEX<span className="period">.</span></h1>
          <p className="hero-subtitle">Stop wondering.<br /><em>Pass the phone.</em></p>
          <PrimaryButton onClick={onStart} arrow>START</PrimaryButton>
          <p className="microcopy">Adults only. Everyone participating must be 18+.</p>
        </div>
        <div className="decision-sculpture" aria-hidden="true">
          <div className="sculpture-halo" />
          <div className="sculpture-shadow" />
          <div className="sculpture-key sculpture-key--yes"><span>YES</span><i>↗</i></div>
          <div className="sculpture-key sculpture-key--no"><span>NO</span><i>↘</i></div>
          <span className="sculpture-spark">✳</span>
        </div>
      </section>
    </Frame>
  )
}
