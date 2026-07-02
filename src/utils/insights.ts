import type { DiagnosisInsight } from '../types/insight'
import type { StatKey, StatScore } from '../types/assessment'
import type { TitleContext } from '../types/title'
import { STAT_KEYS } from '../types/assessment'
import {
  strengthMessages,
  challengeMessages,
  nextGrowthMessages,
  synergyNext,
  q30ToStat,
  insightHeading,
  insightIcon,
} from '../data/insights'

// 伸ばす余地があるとみなす上限（これ以上は「次に伸ばす」対象にしない）
const GROWABLE_MAX = 78

function argmax(stats: StatScore): StatKey {
  return STAT_KEYS.reduce((best, k) => (stats[k] > stats[best] ? k : best), STAT_KEYS[0])
}
function argmin(stats: StatScore): StatKey {
  // 同値時は後方を優先（argmax と衝突させないため）
  return STAT_KEYS.reduce((worst, k) => (stats[k] <= stats[worst] ? k : worst), STAT_KEYS[0])
}

// Q30 の選択を能力キーに変換（順序保持）
function growthWantStats(ctx: TitleContext): StatKey[] {
  const wants = ctx.growthWants ?? []
  const result: StatKey[] = []
  for (const w of wants) {
    const s = q30ToStat[w]
    if (s && !result.includes(s)) result.push(s)
  }
  return result
}

// 「次に伸ばす力」の能力を選ぶ
function pickNextGrowth(stats: StatScore, topStrength: StatKey, ctx: TitleContext): StatKey {
  const candidates: StatKey[] = [...growthWantStats(ctx), synergyNext[topStrength]]
  for (const c of candidates) {
    if (c !== topStrength && stats[c] < GROWABLE_MAX) return c
  }
  // フォールバック：相性能力（強みと同じなら最弱能力）
  const fallback = synergyNext[topStrength]
  return fallback !== topStrength ? fallback : argmin(stats)
}

// 強み・課題・次に伸ばす力を算出
export function computeInsights(
  stats: StatScore,
  ctx: TitleContext = {}
): DiagnosisInsight[] {
  const strengthStat = argmax(stats)
  const challengeStat = argmin(stats)
  const nextStat = pickNextGrowth(stats, strengthStat, ctx)

  return [
    {
      kind: 'strength',
      statKey: strengthStat,
      heading: insightHeading.strength,
      message: strengthMessages[strengthStat],
      iconId: insightIcon.strength,
    },
    {
      kind: 'challenge',
      statKey: challengeStat,
      heading: insightHeading.challenge,
      message: challengeMessages[challengeStat],
      iconId: insightIcon.challenge,
    },
    {
      kind: 'nextGrowth',
      statKey: nextStat,
      heading: insightHeading.nextGrowth,
      message: nextGrowthMessages[nextStat],
      iconId: insightIcon.nextGrowth,
    },
  ]
}
