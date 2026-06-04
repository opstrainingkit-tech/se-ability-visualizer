export type Rank = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export type MainAbilityId =
  | 'development'
  | 'design'
  | 'infrastructure'
  | 'database'
  | 'lead'
  | 'management'
  | 'aiUtilization'

export interface EngineerProfile {
  name: string
  typeName: string
  comment: string
}

export interface MainAbility {
  id: MainAbilityId
  label: string
  score: number
}

export interface SpecialAbility {
  id: string
  label: string
  selected: boolean
}

export interface AbilityCardData {
  profile: EngineerProfile
  mainAbilities: MainAbility[]
  specialAbilities: SpecialAbility[]
}
