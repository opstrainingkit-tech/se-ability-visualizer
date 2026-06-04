import type { AbilityCardData, Rank } from '../types/ability'
import { getRank } from '../utils/getRank'

interface StatusCardProps {
  data: AbilityCardData
}

const rankStyle: Record<Rank, { badge: string; bar: string }> = {
  S: { badge: 'bg-yellow-400 text-slate-900', bar: 'bg-yellow-400' },
  A: { badge: 'bg-orange-400 text-slate-900', bar: 'bg-orange-400' },
  B: { badge: 'bg-green-400 text-slate-900',  bar: 'bg-green-400'  },
  C: { badge: 'bg-blue-400 text-slate-900',   bar: 'bg-blue-400'   },
  D: { badge: 'bg-slate-300 text-slate-900',  bar: 'bg-slate-300'  },
  E: { badge: 'bg-slate-500 text-white',       bar: 'bg-slate-500'  },
  F: { badge: 'bg-slate-600 text-white',       bar: 'bg-slate-600'  },
  G: { badge: 'bg-slate-700 text-slate-400',  bar: 'bg-slate-700'  },
}

export default function StatusCard({ data }: StatusCardProps) {
  const { profile, mainAbilities, specialAbilities } = data
  const selected = specialAbilities.filter(a => a.selected)

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 space-y-6">

      {/* 基本情報 */}
      <div className="border-b border-slate-600 pb-4">
        <p className="text-blue-300 text-xs tracking-widest uppercase mb-3">— Profile —</p>
        <p className="text-white text-lg font-bold">{profile.name || '名前未入力'}</p>
        <p className="text-blue-200 text-sm mt-1">{profile.typeName || 'タイプ未入力'}</p>
        {profile.comment && (
          <p className="text-slate-400 text-xs mt-2 italic">"{profile.comment}"</p>
        )}
      </div>

      {/* メイン能力一覧 */}
      <div className="border-b border-slate-600 pb-4">
        <p className="text-blue-300 text-xs tracking-widest uppercase mb-4">— Main Abilities —</p>
        <div className="space-y-3">
          {mainAbilities.map(ability => {
            const rank = getRank(ability.score)
            const style = rankStyle[rank]
            return (
              <div key={ability.id}>
                {/* 能力名 / ランク / スコア */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-300 text-sm">{ability.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${style.badge}`}>
                      {rank}
                    </span>
                    <span className="text-slate-400 text-xs w-7 text-right font-mono">
                      {ability.score}
                    </span>
                  </div>
                </div>
                {/* スコアバー */}
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${style.bar}`}
                    style={{ width: `${ability.score}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 特殊能力一覧 */}
      <div>
        <p className="text-blue-300 text-xs tracking-widest uppercase mb-3">
          — Special Abilities ({selected.length}) —
        </p>
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selected.map(ability => (
              <span
                key={ability.id}
                className="bg-slate-700 border border-slate-500 text-slate-200 text-xs px-2 py-1 rounded"
              >
                {ability.label}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-xs">特殊能力が選択されていません</p>
        )}
      </div>

    </div>
  )
}
