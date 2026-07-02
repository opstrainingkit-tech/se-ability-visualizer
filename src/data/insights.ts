import type { StatKey } from '../types/assessment'

export const statLabel: Record<StatKey, string> = {
  dev: '開発力',
  design: '設計力',
  infra: 'インフラ力',
  db: 'DB力',
  lead: 'リード力',
  management: 'マネジメント力',
  ai: 'AI活用力',
}

// 強みコメント（7能力）
export const strengthMessages: Record<StatKey, string> = {
  dev: '機能実装や既存コード修正の経験が強みとして出ています。コードを読み、手を動かして形にする力が結果に反映されています。',
  design: '処理の流れや影響範囲を整理する力が強みとして出ています。実装前に構造を考え、全体を見ながら進める経験が反映されています。',
  infra: 'Linux、Docker、クラウド環境など、開発や運用の土台に関わる経験が強みとして出ています。環境や本番まわりへの対応力が反映されています。',
  db: 'SQL、データ調査、テーブル設計など、データまわりの経験が強みとして出ています。データ構造を意識して対応する力が反映されています。',
  lead: 'メンバー支援、相談対応、レビュー、育成などの経験が強みとして出ています。自分の作業だけでなく、周囲を支える力が反映されています。',
  management: '進捗、課題、リスク、優先順位を整理する力が強みとして出ています。状況を把握し、関係者に伝える経験が反映されています。',
  ai: 'AIを調査・実装・レビュー補助に使う経験が強みとして出ています。AIの出力を確認しながら活用する姿勢が結果に反映されています。',
}

// 課題コメント（7能力）
export const challengeMessages: Record<StatKey, string> = {
  dev: '開発力は、今後伸ばせる領域として表示されています。小さな機能実装や既存コードの修正経験を増やすと、結果に反映されやすくなります。',
  design: '設計力は、今後の強化ポイントになりそうです。実装前に処理の流れや影響範囲を整理する習慣を増やすと、開発経験をさらに活かしやすくなります。',
  infra: 'インフラ力は、今後伸ばせる領域として表示されています。Linux、Docker、クラウド環境に触れる機会を増やすと、対応できる範囲が広がりそうです。',
  db: 'DB力は、今後の強化ポイントになりそうです。SQLやテーブル構造、データ調査の経験を増やすと、実務での対応範囲が広がります。',
  lead: 'リード力は、これから伸ばせる領域として表示されています。相談対応やレビュー、作業状況の整理を経験すると、チーム内での支援力が高まりそうです。',
  management: 'マネジメント力は、今後伸ばせる領域として表示されています。進捗・課題・リスクを整理して共有する経験を増やすと、仕事の幅が広がりそうです。',
  ai: 'AI活用力は、今後伸ばせる領域として表示されています。調査や文章整理など小さな用途から使い始めると、開発や学習にも広げやすくなります。',
}

// 次に伸ばす力コメント（7能力）
export const nextGrowthMessages: Record<StatKey, string> = {
  dev: '次に伸ばすなら、開発力が相性のよい領域です。小さな機能を作る経験を増やすと、設計やDB、AI活用の結果も実装に落とし込みやすくなります。',
  design: '次に伸ばすなら、設計力が相性のよい領域です。実装前に処理の流れや影響範囲を整理することで、今ある経験をより上流の判断に活かしやすくなります。',
  infra: '次に伸ばすなら、インフラ力が相性のよい領域です。Linux、Docker、クラウド環境への理解が増えると、開発したものを動かす力まで広げやすくなります。',
  db: '次に伸ばすなら、DB力が相性のよい領域です。SQLやデータ構造への理解が深まると、機能設計や調査対応の精度も上げやすくなります。',
  lead: '次に伸ばすなら、リード力が相性のよい領域です。自分の作業だけでなく、相談対応やレビューに関わることで、チーム内での価値を広げやすくなります。',
  management: '次に伸ばすなら、マネジメント力が相性のよい領域です。進捗・課題・リスクを整理して伝える経験が増えると、関係者を巻き込む動きがしやすくなります。',
  ai: '次に伸ばすなら、AI活用力が相性のよい領域です。調査、実装補助、レビュー補助にAIを使えるようになると、日々の作業を進める速度を上げやすくなります。',
}

// 強みの能力 → 次に伸ばすと相性のよい能力
export const synergyNext: Record<StatKey, StatKey> = {
  dev: 'design',
  design: 'db',
  infra: 'db',
  db: 'design',
  lead: 'management',
  management: 'design',
  ai: 'design',
}

// Q30（伸ばしたい領域）value → 能力
export const q30ToStat: Record<string, StatKey | undefined> = {
  aws: 'infra',
  react: 'dev',
  design: 'design',
  management: 'management',
  ai: 'ai',
  requirements: 'design',
  english: undefined,
  testing: undefined,
  none: undefined,
}

export const insightHeading: Record<'strength' | 'challenge' | 'nextGrowth', string> = {
  strength: '強み',
  challenge: '課題',
  nextGrowth: '次に伸ばす力',
}

export const insightIcon: Record<'strength' | 'challenge' | 'nextGrowth', string> = {
  strength: '/assets/insights/insight-strength.png',
  challenge: '/assets/insights/insight-challenge.png',
  nextGrowth: '/assets/insights/insight-next-growth.png',
}
