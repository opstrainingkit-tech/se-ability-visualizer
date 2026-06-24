import type { AbilityCardData } from '../types/ability'
import { getRank } from '../utils/getRank'
import StatusCard from '../components/StatusCard'
import ShareActions from '../components/ShareActions'

interface ResultPageProps {
  data: AbilityCardData
  onBack: () => void
  onReset: () => void
}

export default function ResultPage({ data, onBack, onReset }: ResultPageProps) {
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
          ← 入力に戻る
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
      <div className="max-w-sm mx-auto px-4 py-8">
        <StatusCard data={data} />

        {/* 共有導線 */}
        <div className="mt-5">
          <ShareActions rank={overallRank} avg={avg} />
        </div>
      </div>

    </div>
  )
}
