import type { MainAbility, SpecialAbility } from '../types/ability'

export const initialMainAbilities: MainAbility[] = [
  { id: 'development',    label: '開発力',       score: 50 },
  { id: 'design',         label: '設計力',       score: 50 },
  { id: 'infrastructure', label: 'インフラ力',   score: 50 },
  { id: 'database',       label: 'DB力',         score: 50 },
  { id: 'lead',           label: 'リード力',     score: 50 },
  { id: 'management',     label: 'マネジメント力', score: 50 },
  { id: 'aiUtilization',  label: 'AI活用力',     score: 50 },
]

export const initialSpecialAbilities: SpecialAbility[] = [
  { id: 'php',             label: 'PHP',           selected: false },
  { id: 'typescript',      label: 'TypeScript',    selected: false },
  { id: 'react',           label: 'React',         selected: false },
  { id: 'laravel',         label: 'Laravel',       selected: false },
  { id: 'aws',             label: 'AWS',           selected: false },
  { id: 'docker',          label: 'Docker',        selected: false },
  { id: 'kubernetes',      label: 'Kubernetes',    selected: false },
  { id: 'terraform',       label: 'Terraform',     selected: false },
  { id: 'cicd',            label: 'CI/CD',         selected: false },
  { id: 'github',          label: 'GitHub',        selected: false },
  { id: 'sql',             label: 'SQL',           selected: false },
  { id: 'performance',     label: 'パフォーマンス改善', selected: false },
  { id: 'incident',        label: '障害対応',      selected: false },
  { id: 'logInvestigation',label: 'ログ調査',      selected: false },
  { id: 'impactCheck',     label: '影響範囲確認',  selected: false },
  { id: 'codeReview',      label: 'コードレビュー', selected: false },
  { id: 'requirements',    label: '要件整理',      selected: false },
  { id: 'documentation',   label: 'ドキュメント作成', selected: false },
  { id: 'clientNego',      label: '顧客折衝',      selected: false },
  { id: 'scrum',           label: 'スクラム推進',  selected: false },
]
