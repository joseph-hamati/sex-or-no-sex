import { useState } from 'react'
import { Frame } from '../components/Frame'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Answer, Participant } from '../types/session'

export function QuestionScreen({ participant, participants, onLock }: {
  participant: Participant
  participants: Participant[]
  onLock: (answers: Answer[]) => void
}) {
  const others = participants.filter((person) => person.id !== participant.id)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [draft, setDraft] = useState<Answer[]>([])
  const finished = questionIndex >= others.length
  const target = others[questionIndex]

  function answer(wantsSex: boolean) {
    if (finished) return
    setDraft((current) => [...current, {
      fromParticipantId: participant.id,
      toParticipantId: target.id,
      wantsSex,
    }])
    setQuestionIndex((current) => current + 1)
  }

  return (
    <Frame eyebrow="YOUR EYES ONLY" progress={finished ? 'READY TO LOCK' : `${questionIndex + 1} / ${others.length}`}>
      {finished ? (
        <section className="standard-stage question-stage stage-enter" key="done">
          <div className="decorative-icon" aria-hidden="true">✓</div>
          <h1 className="stage-title">THAT'S<br />EVERYONE<span className="period">.</span></h1>
          <p className="stage-description">Lock it in, then pass the phone.</p>
          <PrimaryButton onClick={() => onLock(draft)} arrow>LOCK IN ANSWERS</PrimaryButton>
          <p className="microcopy">Your choices won't be shown to anyone.</p>
        </section>
      ) : (
        <section className="standard-stage question-stage stage-enter" key={target.id}>
          <div className="question-counter"><span>QUESTION {String(questionIndex + 1).padStart(2, '0')}</span><span>OF {String(others.length).padStart(2, '0')}</span></div>
          <h1 className="question-title">WOULD YOU<br />HAVE SEX<br />WITH <span>{target.name.toLocaleUpperCase()}</span><span className="period">?</span></h1>
          <div className="answer-buttons" role="group" aria-label={`Would you have sex with ${target.name}?`}>
            <button className="answer-button answer-yes" onClick={() => answer(true)}>YES <span aria-hidden="true">↗</span></button>
            <button className="answer-button answer-no" onClick={() => answer(false)}>NO <span aria-hidden="true">↘</span></button>
          </div>
          <p className="microcopy">Just your answer. Nobody else will see it.</p>
        </section>
      )}
    </Frame>
  )
}
