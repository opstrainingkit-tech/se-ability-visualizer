import type {
  AssessmentAnswers,
  AssessmentResult,
  StatKey,
  StatScore,
  SuggestedAbility,
} from '../types/assessment'
import { STAT_KEYS, emphasisToType } from '../types/assessment'
import {
  scaleQuestions,
  selectQuestions,
  CORRECTION_CAP,
  SUGGEST_LIMIT,
  QUESTIONNAIRE_VERSION,
  CALCULATION_VERSION,
} from '../data/assessmentQuestions'
import { getSpecialAbilityById } from '../data/specialAbilities'

const emptyStat = (): StatScore => ({
  dev: 0, design: 0, infra: 0, db: 0, lead: 0, management: 0, ai: 0,
})

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n))

// Q1〜Q21：4段階回答から各能力の基礎点（0〜100）を算出
export function calculateBaseStats(answers: AssessmentAnswers['scale']): StatScore {
  const raw = emptyStat()
  const max = emptyStat()

  for (const q of scaleQuestions) {
    const a = answers[q.id] ?? 0
    for (const t of q.targets) {
      raw[t.stat] += a * t.weight
      max[t.stat] += 3 * t.weight
    }
  }

  const result = emptyStat()
  for (const stat of STAT_KEYS) {
    result[stat] = max[stat] === 0 ? 0 : Math.round((raw[stat] / max[stat]) * 100)
  }
  return result
}

// Q22〜Q29の事実回答による補正（各能力 最大 +CORRECTION_CAP まで）
export function calculateCorrections(answers: AssessmentAnswers['select']): StatScore {
  const sum = emptyStat()
  for (const q of selectQuestions) {
    const selected = answers[q.id] ?? []
    if (selected.length === 0) continue
    for (const opt of q.options) {
      if (!selected.includes(opt.value)) continue
      for (const b of opt.bonus ?? []) {
        sum[b.stat] += b.amount
      }
    }
  }
  // 上限でクランプ
  for (const stat of STAT_KEYS) {
    sum[stat] = Math.min(CORRECTION_CAP, sum[stat])
  }
  return sum
}

// 特殊能力候補を抽出（id→最高スコアで集約）
function collectCandidates(answers: AssessmentAnswers['select']): Map<string, number> {
  const candidates = new Map<string, number>()
  for (const q of selectQuestions) {
    const selected = answers[q.id] ?? []
    if (selected.length === 0) continue
    const score = q.candidateScore ?? 0
    if (score === 0) continue
    for (const opt of q.options) {
      if (!selected.includes(opt.value)) continue
      for (const id of opt.grant ?? []) {
        const prev = candidates.get(id) ?? 0
        if (score > prev) candidates.set(id, score)
      }
    }
  }
  return candidates
}

// 候補の並び替え：Q32の方向性 → スコア → 種別バランス
function orderCandidates(
  candidates: Map<string, number>,
  emphasis: string | undefined
): SuggestedAbility[] {
  const emphasizedType = emphasis ? emphasisToType[emphasis] : undefined

  const arr: { abilityId: string; score: number; sortOrder: number; isEmphasized: boolean }[] = []
  for (const [abilityId, score] of candidates) {
    const ability = getSpecialAbilityById(abilityId)
    if (!ability) continue // マスタに無いidは除外
    arr.push({
      abilityId,
      score,
      sortOrder: ability.sortOrder,
      isEmphasized: emphasizedType ? ability.type === emphasizedType : false,
    })
  }

  arr.sort((a, b) => {
    if (a.isEmphasized !== b.isEmphasized) return a.isEmphasized ? -1 : 1
    if (a.score !== b.score) return b.score - a.score
    return a.sortOrder - b.sortOrder
  })

  return arr.slice(0, SUGGEST_LIMIT).map(({ abilityId, score }) => ({ abilityId, score }))
}

// 結果コメント（断定を避けた目安表現）
function buildComment(stats: StatScore): string {
  const labels: Record<StatKey, string> = {
    dev: '開発力', design: '設計力', infra: 'インフラ力', db: 'DB力',
    lead: 'リード力', management: 'マネジメント力', ai: 'AI活用力',
  }
  const entries = STAT_KEYS.map(s => ({ s, v: stats[s] }))
  const top = entries.reduce((a, b) => (b.v > a.v ? b : a))
  const low = entries.reduce((a, b) => (b.v < a.v ? b : a))
  return `回答内容から見ると、${labels[top.s]}が比較的高めに出ています。${labels[low.s]}は、今後伸ばせる領域として表示されています。この結果は、自己申告にもとづく目安です。`
}

// 集計のエントリポイント
export function runAssessment(answers: AssessmentAnswers): AssessmentResult {
  const base = calculateBaseStats(answers.scale)
  const corr = calculateCorrections(answers.select)

  const stats = emptyStat()
  for (const stat of STAT_KEYS) {
    stats[stat] = clamp(base[stat] + corr[stat])
  }

  const candidates = collectCandidates(answers.select)
  const emphasis = (answers.select['q32'] ?? [])[0]
  const suggestedAbilities = orderCandidates(candidates, emphasis)

  return {
    questionnaireVersion: QUESTIONNAIRE_VERSION,
    calculationVersion: CALCULATION_VERSION,
    stats,
    suggestedAbilities,
    comment: buildComment(stats),
  }
}
