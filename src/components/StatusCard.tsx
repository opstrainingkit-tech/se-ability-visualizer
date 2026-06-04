import type { AbilityCardData } from '../types/ability'

interface StatusCardProps {
  data: AbilityCardData
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
        <p className="text-blue-300 text-xs tracking-widest uppercase mb-3">— Main Abilities —</p>
        <div className="space-y-2">
          {mainAbilities.map(ability => (
            <div key={ability.id} className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">{ability.label}</span>
              <span className="text-white text-sm font-mono">{ability.score}</span>
            </div>
          ))}
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
