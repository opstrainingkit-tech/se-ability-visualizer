export interface SharePostData {
  title: string // 称号
  overallRank: string // 総合ランク
  strengths: string[] // 強み（上位能力の日本語ラベル・最大2）
  appUrl: string
  hashtags: string[]
}

// 採用テンプレート（短め）：画像に添える共有文
export function buildPostText(data: SharePostData): string {
  const strengths = data.strengths.slice(0, 2).join(' / ')
  const tags = data.hashtags.map(h => `#${h}`).join(' ')
  return `SE能力可視化アプリで診断してみました。

称号：${data.title}
総合ランク：${data.overallRank}
強み：${strengths}

自己理解の目安として使えそうです。

${data.appUrl}

${tags}`
}
