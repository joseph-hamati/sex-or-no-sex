import type { Answer, Match, Participant } from '../types/session'

export function findMutualMatches(participants: Participant[], answers: Answer[]): Match[] {
  const yes = new Set(
    answers
      .filter((answer) => answer.wantsSex)
      .map((answer) => `${answer.fromParticipantId}\u0000${answer.toParticipantId}`),
  )

  const matches: Match[] = []
  for (let firstIndex = 0; firstIndex < participants.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < participants.length; secondIndex += 1) {
      const first = participants[firstIndex]
      const second = participants[secondIndex]
      if (
        yes.has(`${first.id}\u0000${second.id}`) &&
        yes.has(`${second.id}\u0000${first.id}`)
      ) {
        matches.push({ first, second })
      }
    }
  }
  return matches
}

export function findMutualPartners(
  participantId: string,
  participants: Participant[],
  answers: Answer[],
): Participant[] {
  return findMutualMatches(participants, answers).flatMap(({ first, second }) => {
    if (first.id === participantId) return [second]
    if (second.id === participantId) return [first]
    return []
  })
}
