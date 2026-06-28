import type {
  SpecialAbility,
  SpecialAbilityCategory,
  SpecialAbilityType,
} from '../types/ability'

// 特殊能力の選択上限
export const SPECIAL_SELECT_LIMIT = 8

// 種別メタ（表示名・色）。color はタグ/タブ表示で使う。
export const specialTypeMeta: Record<
  SpecialAbilityType,
  { label: string; colorKey: string }
> = {
  normal: { label: '通常能力', colorKey: 'blue' },
  rare: { label: 'レア能力', colorKey: 'red' },
  achievement: { label: '実績能力', colorKey: 'gold' },
  ai: { label: 'AI能力', colorKey: 'purple' },
  certification: { label: '資格能力', colorKey: 'green' },
  negative: { label: '苦手能力', colorKey: 'black' },
  growth: { label: '成長中能力', colorKey: 'gray' },
}

// 種別 → タグ配色クラス（border色も含む。borderを出す側で border 幅クラスを付ける）
export const specialTypeTagClass: Record<SpecialAbilityType, string> = {
  normal: 'bg-blue-100 text-blue-700 border-blue-300',
  rare: 'bg-red-100 text-red-700 border-red-300',
  achievement: 'bg-amber-100 text-amber-800 border-amber-300',
  ai: 'bg-purple-100 text-purple-700 border-purple-300',
  certification: 'bg-green-100 text-green-700 border-green-300',
  negative: 'bg-slate-700 text-white border-slate-700',
  growth: 'bg-slate-200 text-slate-600 border-slate-300',
}

// 種別 → 分類アイコン画像（苦手/成長中は未用意のため undefined）
export const specialTypeIcon: Partial<Record<SpecialAbilityType, string>> = {
  normal: '/assets/special/class-blue-gear.png',
  rare: '/assets/special/class-red-flame.png',
  achievement: '/assets/special/class-gold-trophy.png',
  ai: '/assets/special/class-purple-ai.png',
  certification: '/assets/special/class-green-certification.png',
}

// 種別タブの並び順
export const specialTypeOrder: SpecialAbilityType[] = [
  'normal',
  'rare',
  'achievement',
  'ai',
  'certification',
  'negative',
  'growth',
]

// カテゴリ表示名
export const categoryLabel: Record<SpecialAbilityCategory, string> = {
  language: '言語',
  frontend: 'フロントエンド',
  backend: 'バックエンド',
  database: 'DB',
  infrastructure: 'インフラ',
  cloud: 'クラウド',
  devops: 'DevOps',
  ai: 'AI',
  design: '設計',
  testing: 'テスト・品質',
  operation: '運用・障害対応',
  management: 'リード・マネジメント',
  career: 'キャリア・実績',
  certification: '資格',
}

// 65個の特殊能力マスタ
export const specialAbilityMaster: SpecialAbility[] = [
  // --- 通常能力（青）20個 ---
  { id: 'php', name: 'PHP', type: 'normal', category: 'language', tags: ['backend', 'web'], isDefault: true, sortOrder: 100, selectable: true },
  { id: 'java', name: 'Java', type: 'normal', category: 'language', tags: ['backend'], isDefault: true, sortOrder: 101, selectable: true },
  { id: 'python', name: 'Python', type: 'normal', category: 'language', tags: ['backend', 'ai'], isDefault: true, sortOrder: 102, selectable: true },
  { id: 'javascript', name: 'JavaScript', type: 'normal', category: 'language', tags: ['frontend', 'backend'], isDefault: true, sortOrder: 103, selectable: true },
  { id: 'typescript', name: 'TypeScript', type: 'normal', category: 'language', tags: ['frontend', 'backend'], isDefault: true, sortOrder: 104, selectable: true },
  { id: 'react', name: 'React', type: 'normal', category: 'frontend', tags: ['frontend', 'ui'], isDefault: true, sortOrder: 105, selectable: true },
  { id: 'vue', name: 'Vue', type: 'normal', category: 'frontend', tags: ['frontend', 'ui'], isDefault: true, sortOrder: 106, selectable: true },
  { id: 'laravel', name: 'Laravel', type: 'normal', category: 'backend', tags: ['php', 'backend'], isDefault: true, sortOrder: 107, selectable: true },
  { id: 'spring', name: 'Spring', type: 'normal', category: 'backend', tags: ['java', 'backend'], isDefault: true, sortOrder: 108, selectable: true },
  { id: 'nodejs', name: 'Node.js', type: 'normal', category: 'backend', tags: ['javascript', 'backend'], isDefault: true, sortOrder: 109, selectable: true },
  { id: 'sql', name: 'SQL', type: 'normal', category: 'database', tags: ['database'], isDefault: true, sortOrder: 110, selectable: true },
  { id: 'mysql', name: 'MySQL', type: 'normal', category: 'database', tags: ['database'], isDefault: true, sortOrder: 111, selectable: true },
  { id: 'postgresql', name: 'PostgreSQL', type: 'normal', category: 'database', tags: ['database'], isDefault: true, sortOrder: 112, selectable: true },
  { id: 'redshift', name: 'Redshift', type: 'normal', category: 'database', tags: ['database', 'aws'], isDefault: true, sortOrder: 113, selectable: true },
  { id: 'linux', name: 'Linux', type: 'normal', category: 'infrastructure', tags: ['infra', 'os'], isDefault: true, sortOrder: 114, selectable: true },
  { id: 'git', name: 'Git', type: 'normal', category: 'devops', tags: ['vcs'], isDefault: true, sortOrder: 115, selectable: true },
  { id: 'github', name: 'GitHub', type: 'normal', category: 'devops', tags: ['vcs'], isDefault: true, sortOrder: 116, selectable: true },
  { id: 'docker', name: 'Docker', type: 'normal', category: 'devops', tags: ['container'], isDefault: true, sortOrder: 117, selectable: true },
  { id: 'aws', name: 'AWS', type: 'normal', category: 'cloud', tags: ['cloud'], isDefault: true, sortOrder: 118, selectable: true },
  { id: 'api', name: 'API実装', type: 'normal', category: 'backend', tags: ['backend', 'web'], isDefault: true, sortOrder: 119, selectable: true },

  // --- レア能力（赤）10個 ---
  { id: 'incident-response', name: '障害対応', type: 'rare', category: 'operation', tags: ['troubleshooting', 'production'], isDefault: true, sortOrder: 200, selectable: true },
  { id: 'firefighting', name: '炎上案件対応', type: 'rare', category: 'operation', tags: ['troubleshooting'], isDefault: true, sortOrder: 201, selectable: true },
  { id: 'legacy-refactor', name: 'レガシー改修', type: 'rare', category: 'backend', tags: ['refactoring'], isDefault: true, sortOrder: 202, selectable: true },
  { id: 'spec-reading', name: '仕様読解', type: 'rare', category: 'design', tags: ['analysis'], isDefault: true, sortOrder: 203, selectable: true },
  { id: 'impact-analysis', name: '影響範囲調査', type: 'rare', category: 'operation', tags: ['analysis'], isDefault: true, sortOrder: 204, selectable: true },
  { id: 'performance-tuning', name: 'パフォーマンス改善', type: 'rare', category: 'operation', tags: ['performance'], isDefault: true, sortOrder: 205, selectable: true },
  { id: 'sql-tuning', name: 'SQLチューニング', type: 'rare', category: 'database', tags: ['database', 'performance'], isDefault: true, sortOrder: 206, selectable: true },
  { id: 'knowledge-sharing', name: '属人化解消', type: 'rare', category: 'management', tags: ['team'], isDefault: true, sortOrder: 207, selectable: true },
  { id: 'production-release', name: '本番リリース対応', type: 'rare', category: 'operation', tags: ['release', 'production'], isDefault: true, sortOrder: 208, selectable: true },
  { id: 'client-negotiation', name: '顧客折衝', type: 'rare', category: 'management', tags: ['communication'], isDefault: true, sortOrder: 209, selectable: true },

  // --- 実績能力（金）8個 ---
  { id: 'income-10m', name: '年収1000万達成', type: 'achievement', category: 'career', tags: ['career'], isDefault: true, sortOrder: 300, selectable: true },
  { id: 'high-rate-project', name: '高単価案件経験', type: 'achievement', category: 'career', tags: ['career'], isDefault: true, sortOrder: 301, selectable: true },
  { id: 'long-term-project', name: '長期案件継続', type: 'achievement', category: 'career', tags: ['career'], isDefault: true, sortOrder: 302, selectable: true },
  { id: 'full-remote', name: 'フルリモート継続', type: 'achievement', category: 'career', tags: ['career', 'remote'], isDefault: true, sortOrder: 303, selectable: true },
  { id: 'large-scale-operation', name: '大規模サービス運用', type: 'achievement', category: 'operation', tags: ['scale'], isDefault: true, sortOrder: 304, selectable: true },
  { id: 'lead-experience', name: 'リード経験', type: 'achievement', category: 'management', tags: ['lead'], isDefault: true, sortOrder: 305, selectable: true },
  { id: 'mentoring', name: '新人育成経験', type: 'achievement', category: 'management', tags: ['mentor'], isDefault: true, sortOrder: 306, selectable: true },
  { id: 'revenue-impact', name: '売上影響のある改善', type: 'achievement', category: 'career', tags: ['business'], isDefault: true, sortOrder: 307, selectable: true },

  // --- AI能力（紫）6個 ---
  { id: 'chatgpt', name: 'ChatGPT活用', type: 'ai', category: 'ai', tags: ['ai'], isDefault: true, sortOrder: 400, selectable: true },
  { id: 'claude-code', name: 'Claude Code活用', type: 'ai', category: 'ai', tags: ['ai', 'agent'], isDefault: true, sortOrder: 401, selectable: true },
  { id: 'ai-brainstorm', name: 'AI壁打ち', type: 'ai', category: 'ai', tags: ['ai'], isDefault: true, sortOrder: 402, selectable: true },
  { id: 'prompt-design', name: 'プロンプト設計', type: 'ai', category: 'ai', tags: ['ai', 'prompt'], isDefault: true, sortOrder: 403, selectable: true },
  { id: 'code-generation', name: 'コード生成活用', type: 'ai', category: 'ai', tags: ['ai'], isDefault: true, sortOrder: 404, selectable: true },
  { id: 'ai-review', name: 'AIレビュー', type: 'ai', category: 'ai', tags: ['ai', 'review'], isDefault: true, sortOrder: 405, selectable: true },

  // --- 資格能力（緑）10個 ---
  { id: 'fe', name: '基本情報技術者', type: 'certification', category: 'certification', tags: ['ipa'], isDefault: true, sortOrder: 500, selectable: true },
  { id: 'ap', name: '応用情報技術者', type: 'certification', category: 'certification', tags: ['ipa'], isDefault: true, sortOrder: 501, selectable: true },
  { id: 'sc', name: '情報処理安全確保支援士', type: 'certification', category: 'certification', tags: ['ipa', 'security'], isDefault: true, sortOrder: 502, selectable: true },
  { id: 'db-specialist', name: 'データベーススペシャリスト', type: 'certification', category: 'certification', tags: ['ipa', 'database'], isDefault: true, sortOrder: 503, selectable: true },
  { id: 'nw-specialist', name: 'ネットワークスペシャリスト', type: 'certification', category: 'certification', tags: ['ipa', 'network'], isDefault: true, sortOrder: 504, selectable: true },
  { id: 'pm-exam', name: 'プロジェクトマネージャ', type: 'certification', category: 'certification', tags: ['ipa', 'management'], isDefault: true, sortOrder: 505, selectable: true },
  { id: 'aws-saa', name: 'AWS SAA', type: 'certification', category: 'certification', tags: ['aws', 'cloud'], isDefault: true, sortOrder: 506, selectable: true },
  { id: 'aws-sap', name: 'AWS SAP', type: 'certification', category: 'certification', tags: ['aws', 'cloud'], isDefault: true, sortOrder: 507, selectable: true },
  { id: 'java-silver', name: 'Java Silver', type: 'certification', category: 'certification', tags: ['java'], isDefault: true, sortOrder: 508, selectable: true },
  { id: 'lpic', name: 'LPIC / LinuC', type: 'certification', category: 'certification', tags: ['linux', 'infra'], isDefault: true, sortOrder: 509, selectable: true },

  // --- 苦手能力（黒）5個 ---
  { id: 'weak-css', name: 'CSS苦手', type: 'negative', category: 'frontend', tags: ['weak'], isDefault: true, sortOrder: 600, selectable: true },
  { id: 'weak-estimation', name: '見積もり苦手', type: 'negative', category: 'management', tags: ['weak'], isDefault: true, sortOrder: 601, selectable: true },
  { id: 'weak-meeting', name: '会議で消耗', type: 'negative', category: 'management', tags: ['weak'], isDefault: true, sortOrder: 602, selectable: true },
  { id: 'weak-docs', name: 'ドキュメント後回し', type: 'negative', category: 'design', tags: ['weak'], isDefault: true, sortOrder: 603, selectable: true },
  { id: 'weak-english', name: '英語ドキュメント苦手', type: 'negative', category: 'language', tags: ['weak'], isDefault: true, sortOrder: 604, selectable: true },

  // --- 成長中能力（灰）6個 ---
  { id: 'learning-aws', name: 'AWS学習中', type: 'growth', category: 'cloud', tags: ['learning'], isDefault: true, sortOrder: 700, selectable: true },
  { id: 'learning-react', name: 'React勉強中', type: 'growth', category: 'frontend', tags: ['learning'], isDefault: true, sortOrder: 701, selectable: true },
  { id: 'learning-design', name: '設計勉強中', type: 'growth', category: 'design', tags: ['learning'], isDefault: true, sortOrder: 702, selectable: true },
  { id: 'learning-management', name: 'マネジメント練習中', type: 'growth', category: 'management', tags: ['learning'], isDefault: true, sortOrder: 703, selectable: true },
  { id: 'learning-ai', name: 'AI活用練習中', type: 'growth', category: 'ai', tags: ['learning'], isDefault: true, sortOrder: 704, selectable: true },
  { id: 'learning-requirements', name: '要件定義勉強中', type: 'growth', category: 'design', tags: ['learning'], isDefault: true, sortOrder: 705, selectable: true },
]

// id → マスタ の索引
const masterById = new Map(specialAbilityMaster.map(a => [a.id, a]))

export function getSpecialAbilityById(id: string): SpecialAbility | undefined {
  return masterById.get(id)
}

// 選択id配列をマスタ順（sortOrder）で解決する
export function resolveSpecialAbilities(ids: string[]): SpecialAbility[] {
  const set = new Set(ids)
  return specialAbilityMaster.filter(a => set.has(a.id))
}

// 保存値の健全化：存在する選択可能なidのみ・上限まで・重複除去
export function sanitizeSelectedIds(ids: string[] | undefined): string[] {
  if (!Array.isArray(ids)) return []
  const seen = new Set<string>()
  const result: string[] = []
  for (const id of ids) {
    if (seen.has(id)) continue
    const a = masterById.get(id)
    if (a && a.selectable) {
      seen.add(id)
      result.push(id)
    }
    if (result.length >= SPECIAL_SELECT_LIMIT) break
  }
  return result
}
