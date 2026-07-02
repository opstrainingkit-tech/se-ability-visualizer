export type TitleType =
  | 'balanced'
  | 'developer'
  | 'designer'
  | 'infra'
  | 'database'
  | 'lead'
  | 'management'
  | 'ai'
  | 'field_response'
  | 'achievement'
  | 'certification'
  | 'growth'
  | 'weakness_aware'

export type TitleColorType = 'blue' | 'red' | 'gold' | 'purple' | 'green' | 'gray' | 'black'

// 称号・診断コメント算出のための追加コンテキスト（診断経由のときのみ埋まる）
export interface TitleContext {
  scaleAnswers?: Record<string, number>
  emphasis?: string // Q32
  role?: string // Q31
  growthWants?: string[] // Q30（伸ばしたい領域）
}

// 称号マスタ1件
export interface ResultTitle {
  id: string
  label: string
  type: TitleType
  colorType: TitleColorType
  iconId?: string // /assets/special の class-*（無い場合はプレートのみ）
  priority: number
  // 診断コメント（結果カード下）
  shortComment: string
  detailComment: string
  growthComment?: string
}
