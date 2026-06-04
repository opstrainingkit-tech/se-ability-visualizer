import type { Rank } from '../types/ability'

export function getRank(score: number): Rank {
  if (score >= 90) return 'S'
  if (score >= 80) return 'A'
  if (score >= 70) return 'B'
  if (score >= 60) return 'C'
  if (score >= 50) return 'D'
  if (score >= 40) return 'E'
  if (score >= 30) return 'F'
  return 'G'
}
