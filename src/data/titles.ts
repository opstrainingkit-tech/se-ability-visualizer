import type { ResultTitle, TitleType } from '../types/title'
import type { StatKey } from '../types/assessment'
import type { SpecialAbilityCategory, SpecialAbilityType } from '../types/ability'

const ICON = (name: string) => `/assets/special/${name}.png`

// 称号採用のしきい値（2経路で成立するよう12点固定ではなく緩め）
export const TITLE_ADOPT_THRESHOLD = 6

// 称号マスタ（各タイプ1つ）
export const resultTitles: ResultTitle[] = [
  {
    id: 'balanced',
    label: 'バランス型SE',
    type: 'balanced',
    colorType: 'blue',
    priority: 10,
    shortComment: '複数領域をバランスよく扱える傾向が出ています。',
    detailComment: '特定の突出よりも、7つの能力が大きく偏らず安定しているタイプです。幅広い状況に対応しやすい結果になっています。',
    growthComment: '強調したい領域を1つ決めて伸ばすと、個性がさらに際立ちます。',
  },
  {
    id: 'developer',
    label: '実装特化型エンジニア',
    type: 'developer',
    colorType: 'blue',
    iconId: ICON('class-blue-gear'),
    priority: 60,
    shortComment: '実装・技術スタックが強みとして出ています。',
    detailComment: '機能を作る・修正する力や、扱える技術の広さが結果に反映されています。コードを書く力が中心のタイプです。',
    growthComment: '設計や運用の経験を足すと、対応できる範囲が広がります。',
  },
  {
    id: 'designer',
    label: '設計整理型エンジニア',
    type: 'designer',
    colorType: 'purple',
    priority: 55,
    shortComment: '仕様整理・設計方針を整える力が出ています。',
    detailComment: '仕様読解や影響範囲の調査、構造を整理してから進める傾向が反映された結果です。',
    growthComment: '実装量やマネジメント経験を足すと、設計の説得力がさらに増します。',
  },
  {
    id: 'infra',
    label: '運用安定型エンジニア',
    type: 'infra',
    colorType: 'blue',
    priority: 55,
    shortComment: 'システムを安定して動かす経験が出ています。',
    detailComment: 'Linux・Docker・クラウドや本番対応など、動かし続けるための経験が結果に反映されています。',
    growthComment: '設計やDBの知見を足すと、より広い運用設計を任されやすくなります。',
  },
  {
    id: 'database',
    label: 'データ活用型エンジニア',
    type: 'database',
    colorType: 'blue',
    priority: 55,
    shortComment: 'データまわりの強みが出ています。',
    detailComment: 'SQL・DB設計・性能改善など、データを扱う力が結果に反映されています。',
    growthComment: 'アプリ実装やインフラの知見を足すと、データ基盤全体を見やすくなります。',
  },
  {
    id: 'lead',
    label: 'チーム支援型エンジニア',
    type: 'lead',
    colorType: 'gold',
    iconId: ICON('class-gold-trophy'),
    priority: 65,
    shortComment: 'メンバー支援・育成の傾向が出ています。',
    detailComment: '相談対応やレビュー、育成など、周囲を支える経験が結果に反映されています。',
    growthComment: 'マネジメントの視点を足すと、チーム全体を動かす役割に広がります。',
  },
  {
    id: 'management',
    label: '調整推進型エンジニア',
    type: 'management',
    colorType: 'gold',
    iconId: ICON('class-gold-trophy'),
    priority: 65,
    shortComment: 'プロジェクトを前に進める力が出ています。',
    detailComment: '進捗・課題・リスクの整理や、顧客・関係者との調整経験が結果に反映されています。',
    growthComment: '技術面の深掘りを足すと、判断の説得力がさらに増します。',
  },
  {
    id: 'ai',
    label: 'AI協働型エンジニア',
    type: 'ai',
    colorType: 'purple',
    iconId: ICON('class-purple-ai'),
    priority: 90,
    shortComment: 'AIを開発に活用する傾向が強く出ています。',
    detailComment: 'AIを調査・実装・レビューに取り入れながら進めるスタイルが結果に反映されています。',
    growthComment: 'AIの出力を検証する設計力を足すと、活用の質がさらに上がります。',
  },
  {
    id: 'field_response',
    label: '現場対応型エンジニア',
    type: 'field_response',
    colorType: 'red',
    iconId: ICON('class-red-flame'),
    priority: 100,
    shortComment: '現場での調査・対応経験が強みとして出ています。',
    detailComment: '障害対応、影響範囲調査、本番リリース対応など、実務上の対応経験が結果に反映されています。状況を見て動く力が出やすいタイプです。',
    growthComment: '設計力やマネジメント力を伸ばすと、より広い範囲の対応を任されやすくなります。',
  },
  {
    id: 'achievement',
    label: '実績積み上げ型エンジニア',
    type: 'achievement',
    colorType: 'gold',
    iconId: ICON('class-gold-trophy'),
    priority: 85,
    shortComment: 'キャリア上の実績が結果に表れています。',
    detailComment: '継続・規模・改善への貢献など、これまで積み上げてきた実績が反映されています。',
    growthComment: '実績の背景にある技術・調整の経験も合わせて見せると説得力が増します。',
  },
  {
    id: 'certification',
    label: '資格武装エンジニア',
    type: 'certification',
    colorType: 'green',
    iconId: ICON('class-green-certification'),
    priority: 80,
    shortComment: '資格・認定で知識を証明しているタイプです。',
    detailComment: '取得した資格を通じて、学習や専門領域の知識が客観的に示されています。',
    growthComment: '資格で得た知識を実務経験と結びつけると、さらに強みになります。',
  },
  {
    id: 'growth',
    label: '成長中エンジニア',
    type: 'growth',
    colorType: 'gray',
    iconId: ICON('class-gray-growth'),
    priority: 40,
    shortComment: '伸ばしたい領域が見える、前向きな結果です。',
    detailComment: '学習中・これから伸ばしたい領域が結果に表れています。伸びしろの大きいタイプです。',
    growthComment: '興味のある領域から一歩ずつ経験を積むと、着実に伸びていきます。',
  },
  {
    id: 'weakness_aware',
    label: '弱点把握型エンジニア',
    type: 'weakness_aware',
    colorType: 'black',
    iconId: ICON('class-black-weak'),
    priority: 30,
    shortComment: '苦手を課題として認識できているタイプです。',
    detailComment: '苦手を隠さず把握できていること自体が、改善の第一歩として表れています。',
    growthComment: '苦手のうち1つを小さく克服すると、対応範囲がぐっと広がります。',
  },
]

export const titleByType: Record<TitleType, ResultTitle> = Object.fromEntries(
  resultTitles.map(t => [t.type, t])
) as Record<TitleType, ResultTitle>

// タイプ別スコア判定の設定
export interface TitleScoreConfig {
  type: TitleType
  primaryStat?: StatKey
  scaleQuestionIds?: string[]
  emphasisValue?: string // Q32 完全一致
  emphasisNear?: string[] // Q32 近い
  roleValue?: string // Q31 一致
  roleNear?: string[]
  strongIds?: string[]
  strongTypes?: SpecialAbilityType[]
  strongCategories?: SpecialAbilityCategory[]
  relatedIds?: string[]
  relatedTypes?: SpecialAbilityType[]
  relatedCategories?: SpecialAbilityCategory[]
  gate?: 'achievement' | 'certification' | 'weakness'
}

export const titleScoreConfigs: TitleScoreConfig[] = [
  { type: 'balanced' },
  {
    type: 'developer',
    primaryStat: 'dev',
    scaleQuestionIds: ['q1', 'q2', 'q3'],
    emphasisValue: 'tech',
    roleValue: 'impl',
    roleNear: ['design-impl'],
    strongCategories: ['language', 'frontend', 'backend'],
    relatedCategories: ['devops'],
  },
  {
    type: 'designer',
    primaryStat: 'design',
    scaleQuestionIds: ['q4', 'q5', 'q6'],
    emphasisNear: ['tech'],
    roleValue: 'design-impl',
    strongIds: ['spec-reading', 'impact-analysis', 'legacy-refactor', 'knowledge-sharing'],
    relatedIds: ['learning-design', 'learning-requirements'],
  },
  {
    type: 'infra',
    primaryStat: 'infra',
    scaleQuestionIds: ['q7', 'q8', 'q9'],
    emphasisNear: ['tech'],
    roleValue: 'ops',
    strongCategories: ['infrastructure', 'cloud'],
    strongIds: ['incident-response', 'production-release', 'sc', 'nw-specialist', 'aws-saa', 'aws-sap', 'lpic'],
    relatedIds: ['docker', 'learning-aws'],
  },
  {
    type: 'database',
    primaryStat: 'db',
    scaleQuestionIds: ['q10', 'q11', 'q12'],
    emphasisNear: ['tech'],
    strongCategories: ['database'],
    strongIds: ['sql-tuning', 'db-specialist'],
  },
  {
    type: 'lead',
    primaryStat: 'lead',
    scaleQuestionIds: ['q13', 'q14', 'q15'],
    roleValue: 'lead',
    strongIds: ['lead-experience', 'mentoring', 'knowledge-sharing'],
    relatedIds: ['long-term-project'],
  },
  {
    type: 'management',
    primaryStat: 'management',
    scaleQuestionIds: ['q16', 'q17', 'q18'],
    roleValue: 'management',
    strongIds: ['client-negotiation', 'firefighting', 'production-release', 'pm-exam', 'revenue-impact'],
    relatedIds: ['long-term-project'],
  },
  {
    type: 'ai',
    primaryStat: 'ai',
    scaleQuestionIds: ['q19', 'q20', 'q21'],
    emphasisValue: 'ai',
    roleValue: 'ai-indie',
    strongTypes: ['ai'],
    relatedIds: ['learning-ai'],
  },
  {
    type: 'field_response',
    emphasisValue: 'field',
    strongTypes: ['rare'],
  },
  {
    type: 'achievement',
    gate: 'achievement',
    emphasisValue: 'achievement',
    strongTypes: ['achievement'],
  },
  {
    type: 'certification',
    gate: 'certification',
    emphasisValue: 'certification',
    strongTypes: ['certification'],
  },
  {
    type: 'growth',
    emphasisValue: 'growth',
    roleValue: 'learning',
    strongTypes: ['growth'],
  },
  {
    type: 'weakness_aware',
    gate: 'weakness',
    emphasisValue: 'negative',
    strongTypes: ['negative'],
  },
]
