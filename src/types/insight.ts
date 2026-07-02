import type { StatKey } from './assessment'

export type InsightKind = 'strength' | 'challenge' | 'nextGrowth'

export interface DiagnosisInsight {
  kind: InsightKind
  statKey: StatKey
  heading: string // 強み / 課題 / 次に伸ばす力
  message: string
  iconId: string
}
