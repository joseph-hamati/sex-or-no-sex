import { describe, expect, it } from 'vitest'
import type { Answer, Participant } from '../types/session'
import { findMutualMatches, findMutualPartners } from './matching'

const people: Participant[] = [
  { id: 'j', name: 'Joseph' },
  { id: 'n', name: 'Nadeem' },
  { id: 's', name: 'Sarah' },
  { id: 'm', name: 'Mark' },
]

const answer = (fromParticipantId: string, toParticipantId: string, wantsSex: boolean): Answer => ({
  fromParticipantId,
  toParticipantId,
  wantsSex,
})

describe('findMutualMatches', () => {
  it('matches reciprocal yes answers', () => {
    expect(findMutualMatches(people.slice(0, 2), [answer('j', 'n', true), answer('n', 'j', true)]))
      .toEqual([{ first: people[0], second: people[1] }])
  })

  it('does not match one-sided interest', () => {
    expect(findMutualMatches(people.slice(0, 2), [answer('j', 'n', true), answer('n', 'j', false)]))
      .toEqual([])
  })

  it('returns several reciprocal pairs once each', () => {
    const answers = [
      answer('j', 'n', true), answer('n', 'j', true),
      answer('j', 's', true), answer('s', 'j', true),
      answer('m', 'n', true), answer('n', 'm', true),
      answer('s', 'm', true), answer('m', 's', false),
    ]
    expect(findMutualMatches(people, answers).map(({ first, second }) => [first.id, second.id]))
      .toEqual([['j', 'n'], ['j', 's'], ['n', 'm']])
  })

  it('uses IDs when names are identical', () => {
    const twins = [{ id: 'a', name: 'Alex' }, { id: 'b', name: 'Alex' }]
    expect(findMutualMatches(twins, [answer('a', 'b', true), answer('b', 'a', true)]))
      .toEqual([{ first: twins[0], second: twins[1] }])
  })

  it('does not duplicate a pair when answers repeat', () => {
    const answers = [answer('j', 'n', true), answer('n', 'j', true), answer('j', 'n', true)]
    expect(findMutualMatches(people.slice(0, 2), answers)).toHaveLength(1)
  })

  it('shows a person only their own mutual partners', () => {
    const answers = [
      answer('j', 's', true), answer('s', 'j', true),
      answer('n', 'm', true), answer('m', 'n', true),
      answer('j', 'n', true), answer('n', 'j', false),
    ]
    expect(findMutualPartners('j', people, answers)).toEqual([people[2]])
    expect(findMutualPartners('n', people, answers)).toEqual([people[3]])
    expect(findMutualPartners('s', people, answers)).toEqual([people[0]])
  })
})
