import type { AbilityCardData } from '../types/ability'
import { getRank } from '../utils/getRank'
import StatusCard from '../components/StatusCard'
import ShareActions from '../components/ShareActions'

interface ResultPageProps {
  data: AbilityCardData
  comment?: string
  onBack: () => void
  onReset: () => void
}

export default function ResultPage({ data, comment, onBack, onReset }: ResultPageProps) {
  const avg = Math.round(
    data.mainAbilities.reduce((sum, a) => sum + a.score, 0) / data.mainAbilities.length
  )
  const overallRank = getRank(avg)

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/60 px-5 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors"
        >
          ← 戻る
        </button>
        <span className="text-blue-500 text-xs tracking-widest uppercase font-semibold">
          Result
        </span>
        <button
          onClick={onReset}
          className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
        >
          リセット
        </button>
      </div>

      {/* カードエリア */}
      <div className="max-w-sm mx-auto px-4 py-8 pb-28">
        <StatusCard data={data} />

        {/* 診断コメント（アンケート経由のとき） */}
        {comment && (
          <div className="mt-4 bg-white/85 backdrop-blur-sm border border-white/60 rounded-2xl px-4 py-3 shadow-sm">
            <p className="text-slate-700 text-xs leading-relaxed">{comment}</p>
            <p className="text-slate-400 text-[10px] mt-2">
              ※この結果は、回答内容にもとづく自己理解用の目安です。
            </p>
          </div>
        )}

        {/* 共有導線 */}
        <div className="mt-5">
          <ShareActions rank={overallRank} avg={avg} />
        </div>
      </div>

    </div>
  )
}
