import type { ResultTitle } from '../types/title'
import type { SpecialAbility } from '../types/ability'
import type { StatScore } from '../types/assessment'
import { STAT_KEYS } from '../types/assessment'
import { resolveSpecialAbilities } from '../data/specialAbilities'
import {
  titleScoreConfigs,
  titleByType,
  TITLE_ADOPT_THRESHOLD,
  type TitleScoreConfig,
} from '../data/titles'

// 称号算出のための追加コンテキスト（診断経由のときのみ埋まる）
export interface TitleContext {
  scaleAnswers?: Record<string, number>
  emphasis?: string // Q32
  role?: string // Q31
}

const cap = (n: number, max: number) => Math.min(n, max)

function statTier(v: number): number {
  if (v >= 90) return 6
  if (v >= 80) return 5
  if (v >= 70) return 4
  if (v >= 60) return 2
  if (v >= 50) return 1
  return 0
}

function statusPoint(cfg: TitleScoreConfig, stats: StatScore): number {
  if (cfg.type === 'balanced') {
    const values = STAT_KEYS.map(k => stats[k])
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const spread = Math.max(...values) - Math.min(...values)
    return cap(statTier(avg) + (spread <= 20 ? 2 : 0), 6)
  }
  if (!cfg.primaryStat) return 0
  const v = stats[cfg.primaryStat]
  // 順位ボーナス
  const sorted = [...STAT_KEYS].sort((a, b) => stats[b] - stats[a])
  const rank = sorted.indexOf(cfg.primaryStat)
  const rankBonus = rank === 0 ? 2 : rank === 1 ? 1 : 0
  return cap(statTier(v) + rankBonus, 6)
}

function abilityRelevance(cfg: TitleScoreConfig, a: SpecialAbility): 0 | 1 | 2 {
  // 苦手(negative)・成長中(growth)はカテゴリ一致で他タイプへ加点しない
  // （所有タイプへの明示的な id / type 指定のみ有効）
  const soft = a.type === 'negative' || a.type === 'growth'

  const isStrong =
    (cfg.strongIds?.includes(a.id) ?? false) ||
    (cfg.strongTypes?.includes(a.type) ?? false) ||
    (!soft && (cfg.strongCategories?.includes(a.category) ?? false))
  if (isStrong) return 2

  const isRelated =
    (cfg.relatedIds?.includes(a.id) ?? false) ||
    (cfg.relatedTypes?.includes(a.type) ?? false) ||
    (!soft && (cfg.relatedCategories?.includes(a.category) ?? false))
  return isRelated ? 1 : 0
}

function specialPoint(cfg: TitleScoreConfig, abilities: SpecialAbility[]): number {
  let sum = 0
  for (const a of abilities) sum += abilityRelevance(cfg, a)
  return cap(sum, 6)
}

function answerPoint(cfg: TitleScoreConfig, ctx: TitleContext): number {
  if (!ctx.scaleAnswers || !cfg.scaleQuestionIds || cfg.scaleQuestionIds.length === 0) return 0
  const vals = cfg.scaleQuestionIds.map(id => ctx.scaleAnswers![id] ?? 0)
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  if (avg >= 2.5) return 3
  if (avg >= 2.0) return 2
  if (avg >= 1.5) return 1
  return 0
}

function emphasisPoint(cfg: TitleScoreConfig, ctx: TitleContext): number {
  if (!ctx.emphasis) return 0
  if (cfg.emphasisValue && ctx.emphasis === cfg.emphasisValue) return 3
  if (cfg.emphasisNear?.includes(ctx.emphasis)) return 1
  return 0
}

function rolePoint(cfg: TitleScoreConfig, ctx: TitleContext): number {
  if (!ctx.role) return 0
  if (cfg.roleValue && ctx.role === cfg.roleValue) return 2
  if (cfg.roleNear?.includes(ctx.role)) return 1
  return 0
}

function isEligible(cfg: TitleScoreConfig, abilities: SpecialAbility[], ctx: TitleContext): boolean {
  switch (cfg.gate) {
    case 'achievement':
      return abilities.some(a => a.type === 'achievement')
    case 'certification':
      return abilities.some(a => a.type === 'certification')
    case 'weakness':
      // 本人が苦手を選び、かつ Q32 でネタっぽく見せたい場合のみ
      return abilities.some(a => a.type === 'negative') && ctx.emphasis === 'negative'
    default:
      return true
  }
}

interface Scored {
  cfg: TitleScoreConfig
  score: number
  specialCount: number
  emphasisMatch: boolean
  primaryValue: number
}

// 称号を1つ決定する
export function computeTitle(
  stats: StatScore,
  selectedSpecialIds: string[],
  ctx: TitleContext = {}
): ResultTitle {
  const abilities = resolveSpecialAbilities(selectedSpecialIds)

  const scored: Scored[] = titleScoreConfigs
    .filter(cfg => isEligible(cfg, abilities, ctx))
    .map(cfg => {
      const score =
        statusPoint(cfg, stats) +
        specialPoint(cfg, abilities) +
        answerPoint(cfg, ctx) +
        emphasisPoint(cfg, ctx) +
        rolePoint(cfg, ctx)
      const specialCount = abilities.reduce((n, a) => n + (abilityRelevance(cfg, a) > 0 ? 1 : 0), 0)
      return {
        cfg,
        score,
        specialCount,
        emphasisMatch: !!ctx.emphasis && cfg.emphasisValue === ctx.emphasis,
        primaryValue: cfg.primaryStat ? stats[cfg.primaryStat] : 0,
      }
    })

  // 並び替え：スコア → 強調一致 → 特殊能力数 → 対象ステータス → ネガでない → priority
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    if (a.emphasisMatch !== b.emphasisMatch) return a.emphasisMatch ? -1 : 1
    if (b.specialCount !== a.specialCount) return b.specialCount - a.specialCount
    if (b.primaryValue !== a.primaryValue) return b.primaryValue - a.primaryValue
    const aNeg = a.cfg.type === 'weakness_aware'
    const bNeg = b.cfg.type === 'weakness_aware'
    if (aNeg !== bNeg) return aNeg ? 1 : -1
    return titleByType[b.cfg.type].priority - titleByType[a.cfg.type].priority
  })

  const best = scored[0]
  if (best && best.score >= TITLE_ADOPT_THRESHOLD && best.cfg.type !== 'balanced') {
    return titleByType[best.cfg.type]
  }

  // フォールバック：成長中の兆候があれば成長中、そうでなければバランス型
  const avg = STAT_KEYS.reduce((s, k) => s + stats[k], 0) / STAT_KEYS.length
  const hasGrowth = abilities.some(a => a.type === 'growth')
  if (hasGrowth || ctx.role === 'learning' || avg < 45) {
    return titleByType.growth
  }
  return titleByType.balanced
}
