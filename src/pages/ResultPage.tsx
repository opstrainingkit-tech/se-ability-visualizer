import type { AbilityCardData } from '../types/ability'
import StatusCard from '../components/StatusCard'

interface ResultPageProps {
  data: AbilityCardData
  onBack: () => void
  onReset: () => void
}

export default function ResultPage({ data, onBack, onReset }: ResultPageProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* ヘッダー */}
      <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← 入力に戻る
        </button>
        <span className="text-blue-300 text-xs tracking-widest uppercase">
          Status Card
        </span>
        <button
          onClick={onReset}
          className="text-red-400 hover:text-red-300 text-sm transition-colors"
        >
          リセット
        </button>
      </div>

      {/* カードエリア */}
      <div className="max-w-lg mx-auto px-6 py-8">
        <StatusCard data={data} />
      </div>

    </div>
  )
}
