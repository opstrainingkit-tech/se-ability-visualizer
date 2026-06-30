import type { MainAbilityId, SpecialAbilityType } from './ability'

// ステータス7能力のキー（アンケート内部表現）
export type StatKey = 'dev' | 'design' | 'infra' | 'db' | 'lead' | 'management' | 'ai'

export const STAT_KEYS: StatKey[] = ['dev', 'design', 'infra', 'db', 'lead', 'management', 'ai']

// StatKey → アプリの MainAbilityId への対応
export const statToMainAbility: Record<StatKey, MainAbilityId> = {
  dev: 'development',
  design: 'design',
  infra: 'infrastructure',
  db: 'database',
  lead: 'lead',
  management: 'management',
  ai: 'aiUtilization',
}

export type StatScore = Record<StatKey, number>

// Q1〜Q21（4段階スケール）
export interface ScaleTarget {
  stat: StatKey
  weight: number
}
export interface ScaleQuestion {
  id: string
  text: string
  targets: ScaleTarget[]
  options: [string, string, string, string] // 0..3
}

// 複数/単一選択（Q22〜Q32）の選択肢効果
export interface SelectOption {
  value: string
  label: string
  grant?: string[] // 付与する特殊能力id（マスタのid）
  bonus?: { stat: StatKey; amount: number }[] // 事実補正
}
export interface SelectQuestion {
  id: string
  text: string
  note?: string
  multi: boolean // true=複数選択 / false=単一選択
  optional?: boolean
  // 候補スコア（このQで選ばれた付与候補に与えるスコア）
  candidateScore?: number
  options: SelectOption[]
}

// アンケート回答
export interface AssessmentAnswers {
  scale: Record<string, number> // qid -> 0..3
  select: Record<string, string[]> // qid -> 選択value配列
}

// おすすめ特殊能力候補
export interface SuggestedAbility {
  abilityId: string
  score: number
}

// 集計結果
export interface AssessmentResult {
  questionnaireVersion: string
  calculationVersion: string
  stats: StatScore // 0..100
  suggestedAbilities: SuggestedAbility[] // 並び替え済み・最大12
  comment: string
}

// Q32「見せたい方向性」value → 優先する種別
export const emphasisToType: Record<string, SpecialAbilityType> = {
  tech: 'normal',
  field: 'rare',
  achievement: 'achievement',
  ai: 'ai',
  certification: 'certification',
  growth: 'growth',
  negative: 'negative',
}
