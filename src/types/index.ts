export type Rank = 'S' | 'A' | 'B' | 'C' | 'D'

export interface AbilityItem {
  id: string
  label: string
  description: string
}

export interface AbilityScore {
  id: string
  label: string
  value: number
  rank: Rank
}

export interface UserInput {
  name: string
  typeName: string
  scores: Record<string, number>
}
