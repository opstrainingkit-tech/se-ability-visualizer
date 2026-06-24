import { useState } from 'react'
import type { Rank } from '../types/ability'
import { trackShareClick } from '../utils/analytics'

interface ShareActionsProps {
  rank: Rank
  avg: number
}

const APP_URL =
  typeof window !== 'undefined' ? window.location.origin + '/' : 'https://se-ability-visualizer.vercel.app/'

export default function ShareActions({ rank, avg }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `私のエンジニア能力ステータスは総合ランク ${rank}（平均${avg}）でした⚔️\nあなたも診断してみよう！`

  const handleShare = async () => {
    // モバイル等：ネイティブ共有シート
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'SE Ability Visualizer',
          text: shareText,
          url: APP_URL,
        })
        trackShareClick('webshare')
      } catch {
        // ユーザーがキャンセルした場合は何もしない
      }
      return
    }
    // 非対応環境：Xシェアにフォールバック
    handleX()
  }

  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(APP_URL)}&hashtags=${encodeURIComponent('SE能力可視化')}`
    window.open(url, '_blank', 'noopener,noreferrer')
    trackShareClick('x')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${APP_URL}`)
      setCopied(true)
      trackShareClick('copy')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボード非対応時は無視
    }
  }

  return (
    <div className="space-y-3">
      {/* スクショ案内 */}
      <div className="flex items-center justify-center gap-2 text-blue-900/80 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
        <img src="/assets/icons/icon-download.png" alt="" aria-hidden className="w-4 h-4" />
        <p className="text-xs font-medium">
          スクショして画像でシェア／下のボタンでリンク共有
        </p>
      </div>

      {/* メイン共有ボタン */}
      <button
        onClick={handleShare}
        aria-label="結果をシェアする"
        className="relative w-full h-14 flex items-center justify-center transition-transform duration-150 hover:scale-[1.03] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{
          backgroundImage: "url('/assets/buttons/button-pill-blue.png')",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <span className="flex items-center gap-2 text-white font-bold text-base tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          <img src="/assets/icons/icon-share.png" alt="" aria-hidden className="w-5 h-5 brightness-0 invert" />
          結果をシェアする
        </span>
      </button>

      {/* サブ導線：X / リンクコピー */}
      <div className="flex gap-2">
        <button
          onClick={handleX}
          className="flex-1 bg-white/80 hover:bg-white text-blue-900 text-sm font-semibold rounded-full py-2.5 shadow-sm transition-colors"
        >
          Xでシェア
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 bg-white/80 hover:bg-white text-blue-900 text-sm font-semibold rounded-full py-2.5 shadow-sm transition-colors"
        >
          {copied ? '✓ コピーしました' : 'リンクをコピー'}
        </button>
      </div>
    </div>
  )
}
