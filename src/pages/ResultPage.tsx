import type { AbilityCardData } from '../types/ability'
import type { ResultTitle } from '../types/title'
import type { DiagnosisInsight, InsightKind } from '../types/insight'
import { getRank } from '../utils/getRank'
import StatusCard from '../components/StatusCard'
import ShareActions from '../components/ShareActions'

interface ResultPageProps {
  data: AbilityCardData
  title: ResultTitle
  insights: DiagnosisInsight[]
  onBack: () => void
  onReset: () => void
}

// カードの配色（強み=青 / 課題=白銀 / 次に伸ばす力=緑）
const insightStyle: Record<InsightKind, { border: string; heading: string }> = {
  strength: { border: 'border-blue-200', heading: 'text-blue-700' },
  challenge: { border: 'border-slate-200', heading: 'text-slate-600' },
  nextGrowth: { border: 'border-green-200', heading: 'text-green-700' },
}

export default function ResultPage({ data, title, insights, onBack, onReset }: ResultPageProps) {
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
        <StatusCard data={data} title={title} />

        {/* 診断コメント（称号由来） */}
        <div className="mt-4 bg-white/85 backdrop-blur-sm border border-white/60 rounded-2xl px-4 py-3 shadow-sm">
          <p className="text-blue-600 text-[10px] tracking-[0.2em] uppercase font-semibold mb-1.5">診断コメント</p>
          <p className="text-slate-700 text-xs leading-relaxed">{title.detailComment}</p>
        </div>

        {/* 強み・課題・次に伸ばす力 */}
        <div className="mt-3 space-y-3">
          {insights.map(ins => (
            <div
              key={ins.kind}
              className={`bg-white/90 backdrop-blur-sm border ${insightStyle[ins.kind].border} rounded-2xl px-4 py-3 shadow-sm flex gap-3`}
            >
              <img src={ins.iconId} alt="" aria-hidden className="w-9 h-9 shrink-0 drop-shadow-sm" />
              <div className="min-w-0">
                <p className={`text-sm font-bold ${insightStyle[ins.kind].heading}`}>{ins.heading}</p>
                <p className="text-slate-600 text-xs leading-relaxed mt-1">{ins.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 注記 */}
        <p className="text-slate-400 text-[10px] mt-3 px-1">
          ※この結果は、回答内容にもとづく自己理解用の目安です。
        </p>

        {/* 共有導線 */}
        <div className="mt-5">
          <ShareActions rank={overallRank} avg={avg} />
        </div>
      </div>

    </div>
  )
}
