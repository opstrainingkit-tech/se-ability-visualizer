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

// 特殊能力の種別（表示分類）。タグ背景の色と1対1で対応する。
export type SpecialAbilityType =
  | 'normal' // 通常能力（青）
  | 'rare' // レア能力（赤）
  | 'achievement' // 実績能力（金）
  | 'ai' // AI能力（紫）
  | 'certification' // 資格能力（緑）
  | 'negative' // 苦手能力（黒）
  | 'growth' // 成長中能力（灰）

// 特殊能力のカテゴリ（技術領域での絞り込み用）
export type SpecialAbilityCategory =
  | 'language'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'infrastructure'
  | 'cloud'
  | 'devops'
  | 'ai'
  | 'design'
  | 'testing'
  | 'operation'
  | 'management'
  | 'career'
  | 'certification'

// 特殊能力マスタ1件分の定義
export interface SpecialAbility {
  id: string
  name: string
  shortName?: string
  type: SpecialAbilityType
  category: SpecialAbilityCategory
  tags: string[]
  description?: string
  isDefault: boolean
  sortOrder: number
  selectable: boolean
}

export interface AbilityCardData {
  profile: EngineerProfile
  mainAbilities: MainAbility[]
  // 選択された特殊能力のid配列（マスタから解決する）
  selectedSpecialIds: string[]
}
