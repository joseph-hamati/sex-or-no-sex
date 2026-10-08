import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { AgeConfirmation } from './pages/AgeConfirmation'
import { ParticipantCount } from './pages/ParticipantCount'
import { ParticipantNames } from './pages/ParticipantNames'
import { PassPhoneScreen } from './pages/PassPhoneScreen'
import { QuestionScreen } from './pages/QuestionScreen'
import { ResultsScreen } from './pages/ResultsScreen'
import { CompleteScreen } from './pages/CompleteScreen'
import type { Answer, AppStage, Participant } from './types/session'
import { findMutualPartners } from './utils/matching'

function App() {
  const [stage, setStage] = useState<AppStage>('landing')
  const [count, setCount] = useState(2)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  function startOver() {
    setAnswers([])
    setParticipants([])
    setCurrentIndex(0)
    setCount(2)
    setStage('landing')
  }

  function lockAnswers(newAnswers: Answer[]) {
    setAnswers((current) => [...current, ...newAnswers])
    if (currentIndex + 1 < participants.length) {
      setCurrentIndex(currentIndex + 1)
      setStage('pass-phone')
    } else {
      setCurrentIndex(0)
      setStage('result-pass-phone')
    }
  }

  function hideResult() {
    if (currentIndex + 1 < participants.length) {
      setCurrentIndex(currentIndex + 1)
      setStage('result-pass-phone')
    } else {
      setAnswers([])
      setStage('complete')
    }
  }

  if (stage === 'landing') return <LandingPage onStart={() => setStage('age-confirmation')} />
  if (stage === 'age-confirmation') return <AgeConfirmation onContinue={() => setStage('participant-count')} />
  if (stage === 'participant-count') return <ParticipantCount onNext={(value) => { setCount(value); setStage('participant-names') }} />
  if (stage === 'participant-names') return <ParticipantNames count={count} onComplete={(people) => { setParticipants(people); setCurrentIndex(0); setStage('pass-phone') }} />
  if (stage === 'pass-phone') return <PassPhoneScreen participant={participants[currentIndex]} turn={currentIndex + 1} total={participants.length} onReady={() => setStage('questions')} />
  if (stage === 'questions') return <QuestionScreen key={participants[currentIndex].id} participant={participants[currentIndex]} participants={participants} onLock={lockAnswers} />
  if (stage === 'result-pass-phone') return <PassPhoneScreen phase="results" participant={participants[currentIndex]} turn={currentIndex + 1} total={participants.length} onReady={() => setStage('private-results')} />
  if (stage === 'private-results') return <ResultsScreen participantCount={participants.length} partners={findMutualPartners(participants[currentIndex].id, participants, answers)} onDone={hideResult} isLast={currentIndex === participants.length - 1} />
  return <CompleteScreen onStartOver={startOver} />
}

export default App
