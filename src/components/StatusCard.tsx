import type { AbilityCardData, Rank } from '../types/ability'
import { getRank } from '../utils/getRank'

interface StatusCardProps {
  data: AbilityCardData
}

const rankStyle: Record<Rank, { badge: string; bar: string; glow: string }> = {
  S: { badge: 'bg-yellow-400 text-slate-900',  bar: 'bg-yellow-400',  glow: 'shadow-yellow-400/40' },
  A: { badge: 'bg-orange-400 text-slate-900',  bar: 'bg-orange-400',  glow: 'shadow-orange-400/40' },
  B: { badge: 'bg-green-400 text-slate-900',   bar: 'bg-green-400',   glow: 'shadow-green-400/40'  },
  C: { badge: 'bg-blue-400 text-slate-900',    bar: 'bg-blue-400',    glow: 'shadow-blue-400/40'   },
  D: { badge: 'bg-slate-300 text-slate-900',   bar: 'bg-slate-300',   glow: ''                     },
  E: { badge: 'bg-slate-500 text-white',        bar: 'bg-slate-500',   glow: ''                     },
  F: { badge: 'bg-slate-600 text-white',        bar: 'bg-slate-600',   glow: ''                     },
  G: { badge: 'bg-slate-700 text-slate-400',   bar: 'bg-slate-700',   glow: ''                     },
}

function calcOverallRank(mainAbilities: AbilityCardData['mainAbilities']): Rank {
  const avg = mainAbilities.reduce((sum, a) => sum + a.score, 0) / mainAbilities.length
  return getRank(Math.round(avg))
}

export default function StatusCard({ data }: StatusCardProps) {
  const { profile, mainAbilities, specialAbilities } = data
  const selected = specialAbilities.filter(a => a.selected)
  const overallRank = calcOverallRank(mainAbilities)
  const overallStyle = rankStyle[overallRank]

  return (
    <div className="bg-slate-900 border-2 border-blue-400 rounded-xl overflow-hidden shadow-2xl shadow-blue-900/50">

      {/* カードヘッダー */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-blue-400/40 px-5 py-3 flex items-center justify-between">
        <span className="text-blue-300 text-xs tracking-[0.25em] uppercase font-medium">
          SE Ability Visualizer
        </span>
        <span className="text-slate-500 text-xs">ver 0.1.0</span>
      </div>

      <div className="p-5 space-y-5">

        {/* プロフィールエリア */}
        <div className="flex items-start gap-4">
          {/* 総合ランクバッジ */}
          <div className={`
            flex-shrink-0 w-14 h-14 rounded-lg border-2 border-blue-400
            flex flex-col items-center justify-center
            bg-slate-800 shadow-lg ${overallStyle.glow}
          `}>
            <span className="text-slate-400 text-[9px] leading-none mb-0.5">RANK</span>
            <span className={`text-2xl font-black leading-none ${
              overallRank === 'S' ? 'text-yellow-400' :
              overallRank === 'A' ? 'text-orange-400' :
              overallRank === 'B' ? 'text-green-400'  :
              overallRank === 'C' ? 'text-blue-400'   : 'text-slate-400'
            }`}>
              {overallRank}
            </span>
          </div>

          {/* 名前・タイプ */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-xl font-bold leading-tight truncate">
              {profile.name || '名前未入力'}
            </p>
            <p className="text-blue-300 text-sm mt-0.5 truncate">
              {profile.typeName || 'タイプ未入力'}
            </p>
            {profile.comment && (
              <p className="text-slate-400 text-xs mt-1.5 italic leading-snug line-clamp-2">
                "{profile.comment}"
              </p>
            )}
          </div>
        </div>

        {/* 区切り */}
        <div className="border-t border-slate-700" />

        {/* メイン能力 */}
        <div>
          <p className="text-blue-300 text-[10px] tracking-[0.3em] uppercase mb-3">
            Main Abilities
          </p>
          <div className="space-y-2.5">
            {mainAbilities.map(ability => {
              const rank = getRank(ability.score)
              const style = rankStyle[rank]
              return (
                <div key={ability.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-200 text-sm">{ability.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black px-1.5 py-0.5 rounded ${style.badge}`}>
                        {rank}
                      </span>
                      <span className="text-slate-400 text-xs w-6 text-right font-mono tabular-nums">
                        {ability.score}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${style.bar}`}
                      style={{ width: `${ability.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 特殊能力 */}
        {selected.length > 0 && (
          <>
            <div className="border-t border-slate-700" />
            <div>
              <p className="text-blue-300 text-[10px] tracking-[0.3em] uppercase mb-3">
                Special Abilities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.map(ability => (
                  <span
                    key={ability.id}
                    className="bg-slate-800 border border-blue-400/50 text-blue-100 text-xs px-2.5 py-1 rounded-full"
                  >
                    {ability.label}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* カードフッター */}
      <div className="border-t border-blue-400/30 px-5 py-2 bg-slate-800/50 text-center">
        <p className="text-slate-600 text-[10px] tracking-widest uppercase">
          SE Ability Visualizer — Status Card
        </p>
      </div>

    </div>
  )
}
