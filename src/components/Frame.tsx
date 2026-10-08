import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  eyebrow?: string
  progress?: string
}

export function Frame({ children, eyebrow, progress }: Props) {
  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="brand" aria-label="Sex or No Sex">S<span>✳</span>NS</div>
        <div className="header-right"><span className="adult-pill">18+ ONLY</span><span className="header-dot" /></div>
      </header>
      <main className="site-main" id="main-content">
        <div className="content-wrap" key={eyebrow}>
          {(eyebrow || progress) && <div className="eyebrow-row"><span>{eyebrow}</span><span>{progress}</span></div>}
          {children}
        </div>
      </main>
      <footer className="site-footer">
        <span>ONE PHONE. ZERO GUESSWORK.</span>
        <span>PRIVATE BY DESIGN ↗</span>
      </footer>
    </div>
  )
}
