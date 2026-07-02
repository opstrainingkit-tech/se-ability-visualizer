import { useState, type RefObject } from 'react'
import { toBlob } from 'html-to-image'
import { trackShareClick } from '../utils/analytics'

interface ShareActionsProps {
  cardRef: RefObject<HTMLDivElement | null>
  postText: string
  appUrl: string
}

async function generateCardBlob(node: HTMLElement): Promise<Blob | null> {
  try {
    return await toBlob(node, {
      pixelRatio: 2,
      backgroundColor: '#dbeafe', // 淡い空色の余白
      cacheBust: true,
    })
  } catch {
    return null
  }
}

export default function ShareActions({ cardRef, postText, appUrl }: ShareActionsProps) {
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)

  // 1. ステータス画像を保存 / 共有
  const handleSaveImage = async () => {
    if (!cardRef.current || busy) return
    setBusy(true)
    try {
      const blob = await generateCardBlob(cardRef.current)
      if (!blob) return
      const file = new File([blob], 'se-ability-card.png', { type: 'image/png' })

      // 対応端末：画像付きでネイティブ共有シート
      if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: postText })
          trackShareClick('webshare')
          return
        } catch {
          // キャンセル時はダウンロードにフォールバックしない
          return
        }
      }

      // 非対応：PNGダウンロード
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'se-ability-card.png'
      a.click()
      URL.revokeObjectURL(url)
      trackShareClick('save-image')
    } finally {
      setBusy(false)
    }
  }

  // 2. 投稿文をコピー
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postText)
      setCopied(true)
      trackShareClick('copy')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボード非対応時は無視
    }
  }

  // 3. Xで共有（投稿画面を開く）
  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postText)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    trackShareClick('x')
    void appUrl
  }

  return (
    <div className="bg-white/85 backdrop-blur-sm border border-white/60 rounded-2xl px-4 py-4 shadow-sm space-y-3">
      <p className="text-blue-700 text-sm font-bold text-center">診断結果を共有する</p>

      {/* メイン：画像を保存 / 共有 */}
      <button
        onClick={handleSaveImage}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold text-sm shadow-sm transition-colors"
      >
        <img src="/assets/share/share-save-image.png" alt="" aria-hidden className="w-6 h-6" />
        {busy ? '画像を生成中…' : 'ステータス画像を保存'}
      </button>

      {/* サブ：投稿文コピー / X */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:border-blue-400 text-blue-900 text-sm font-semibold rounded-full py-2.5 shadow-sm transition-colors"
        >
          <img src="/assets/share/share-copy-text.png" alt="" aria-hidden className="w-5 h-5" />
          {copied ? '✓ コピー済み' : '投稿文をコピー'}
        </button>
        <button
          onClick={handleX}
          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-full py-2.5 shadow-sm transition-colors"
        >
          Xで共有
        </button>
      </div>

      {/* 案内文 */}
      <div className="flex items-start gap-2 pt-1">
        <img src="/assets/share/share-attach.png" alt="" aria-hidden className="w-5 h-5 shrink-0" />
        <p className="text-slate-500 text-[11px] leading-relaxed">
          ステータス画像を保存して、X投稿時に添付すると見栄えよく共有できます。
        </p>
      </div>
    </div>
  )
}
