import type { AbilityCardData, MainAbilityId, Rank } from '../types/ability'
import { getRank } from '../utils/getRank'
import { resolveSpecialAbilities, specialTypeTagClass } from '../data/specialAbilities'

interface StatusCardProps {
  data: AbilityCardData
}

const rankBar: Record<Rank, string> = {
  S: 'bg-yellow-400',
  A: 'bg-orange-400',
  B: 'bg-green-400',
  C: 'bg-blue-400',
  D: 'bg-slate-300',
  E: 'bg-slate-400',
  F: 'bg-slate-500',
  G: 'bg-slate-600',
}

const abilityIcon: Record<MainAbilityId, string> = {
  development: '/assets/abilities/ability-development.png',
  design: '/assets/abilities/ability-design.png',
  infrastructure: '/assets/abilities/ability-infrastructure.png',
  database: '/assets/abilities/ability-database.png',
  lead: '/assets/abilities/ability-lead.png',
  management: '/assets/abilities/ability-management.png',
  aiUtilization: '/assets/abilities/ability-ai.png',
}

const rankImg = (rank: Rank) => `/assets/ranks/rank-${rank.toLowerCase()}.png`

export default function StatusCard({ data }: StatusCardProps) {
  const { profile, mainAbilities, selectedSpecialIds } = data
  const selected = resolveSpecialAbilities(selectedSpecialIds)
  const avg = Math.round(
    mainAbilities.reduce((sum, a) => sum + a.score, 0) / mainAbilities.length
  )
  const overallRank = getRank(avg)

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-white/70 ring-1 ring-blue-100 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/15">

      {/* カードヘッダー */}
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 border-b border-blue-200/60 px-5 py-3 flex items-center justify-between">
        <span className="text-blue-700 text-xs tracking-[0.25em] uppercase font-semibold">
          SE Ability Visualizer
        </span>
        <span className="text-slate-400 text-xs">ver 0.1.0</span>
      </div>

      <div className="p-5 space-y-5">

        {/* プロフィールエリア */}
        <div className="flex items-center gap-4">
          {/* アバター */}
          <img
            src="/assets/profile/avatar-boy.png"
            alt="アバター"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-300 shadow-md shadow-blue-900/15 shrink-0 bg-white"
          />
          {/* 名前・タイプ */}
          <div className="flex-1 min-w-0">
            <p className="text-slate-900 text-xl font-bold leading-tight truncate">
              {profile.name || '名前未入力'}
            </p>
            <p className="text-blue-600 text-sm mt-0.5 truncate">
              {profile.typeName || 'タイプ未入力'}
            </p>
            {profile.comment && (
              <p className="text-slate-500 text-xs mt-1.5 italic leading-snug line-clamp-2">
                "{profile.comment}"
              </p>
            )}
          </div>
        </div>

        {/* 総合ランク（月桂冠＋ランクバッジ） */}
        <div className="flex flex-col items-center">
          <p className="text-blue-500 text-[10px] tracking-[0.3em] uppercase mb-1 font-semibold">
            Total Rank
          </p>
          <div className="relative w-36 h-24 flex items-center justify-center">
            <img
              src="/assets/profile/decoration-laurel.png"
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-contain"
            />
            <img
              src={rankImg(overallRank)}
              alt={`総合ランク ${overallRank}`}
              className="relative w-14 h-14 drop-shadow-lg mb-1"
            />
          </div>
          <p className="text-slate-500 text-xs -mt-1">
            平均スコア <span className="text-slate-900 font-bold font-mono">{avg}</span>
          </p>
        </div>

        {/* 区切り */}
        <div className="border-t border-slate-200" />

        {/* メイン能力 */}
        <div>
          <p className="text-blue-500 text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold">
            Main Abilities
          </p>
          <div className="space-y-2.5">
            {mainAbilities.map(ability => {
              const rank = getRank(ability.score)
              return (
                <div key={ability.id} className="flex items-center gap-2.5">
                  <img
                    src={abilityIcon[ability.id]}
                    alt=""
                    aria-hidden
                    className="w-7 h-7 shrink-0 drop-shadow"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-700 text-sm font-medium">{ability.label}</span>
                      <div className="flex items-center gap-1.5">
                        <img src={rankImg(rank)} alt={rank} className="w-5 h-5 drop-shadow" />
                        <span className="text-slate-500 text-xs w-6 text-right font-mono tabular-nums">
                          {ability.score}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${rankBar[rank]}`}
                        style={{ width: `${ability.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 特殊能力 */}
        {selected.length > 0 && (
          <>
            <div className="border-t border-slate-200" />
            <div>
              <p className="text-blue-500 text-[10px] tracking-[0.3em] uppercase mb-3 font-semibold">
                Special Abilities
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.map(ability => (
                  <span
                    key={ability.id}
                    className={`border text-xs px-2.5 py-1 rounded-full font-medium ${specialTypeTagClass[ability.type]}`}
                  >
                    {ability.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* カードフッター */}
      <div className="border-t border-blue-100 px-5 py-2 bg-sky-50/70 text-center">
        <p className="text-slate-400 text-[10px] tracking-widest uppercase">
          SE Ability Visualizer — Status Card
        </p>
      </div>

    </div>
  )
}
