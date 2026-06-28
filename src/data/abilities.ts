import type { MainAbility } from '../types/ability'

export const initialMainAbilities: MainAbility[] = [
  { id: 'development',    label: '開発力',       score: 50 },
  { id: 'design',         label: '設計力',       score: 50 },
  { id: 'infrastructure', label: 'インフラ力',   score: 50 },
  { id: 'database',       label: 'DB力',         score: 50 },
  { id: 'lead',           label: 'リード力',     score: 50 },
  { id: 'management',     label: 'マネジメント力', score: 50 },
  { id: 'aiUtilization',  label: 'AI活用力',     score: 50 },
]

// 特殊能力マスタは data/specialAbilities.ts に移動
