export type Participant = {
  id: string
  name: string
}

export type Answer = {
  fromParticipantId: string
  toParticipantId: string
  wantsSex: boolean
}

export type Match = {
  first: Participant
  second: Participant
}

export type AppStage =
  | 'landing'
  | 'age-confirmation'
  | 'participant-count'
  | 'participant-names'
  | 'pass-phone'
  | 'questions'
  | 'result-pass-phone'
  | 'private-results'
  | 'complete'
