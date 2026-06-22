import type { MainAbility, MainAbilityId } from '../types/ability'
import { getRank } from '../utils/getRank'

interface MainAbilityFormProps {
  mainAbilities: MainAbility[]
  onChange: (abilities: MainAbility[]) => void
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

export default function MainAbilityForm({ mainAbilities, onChange }: MainAbilityFormProps) {
  const handleChange = (index: number, value: number) => {
    const clamped = Math.min(100, Math.max(0, value))
    const updated = mainAbilities.map((a, i) =>
      i === index ? { ...a, score: clamped } : a
    )
    onChange(updated)
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl p-5 shadow-lg shadow-blue-900/10">
      <img
        src="/assets/tabs/tab-main-ability.png"
        alt="メイン能力"
        className="h-11 mx-auto mb-5"
      />

      <div className="space-y-4">
        {mainAbilities.map((ability, index) => {
          const rank = getRank(ability.score)
          return (
            <div key={ability.id} className="flex items-center gap-3">
              <img
                src={abilityIcon[ability.id]}
                alt={ability.label}
                className="w-9 h-9 shrink-0 drop-shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-800">{ability.label}</span>
                  <div className="flex items-center gap-2">
                    <img
                      src={`/assets/ranks/rank-${rank.toLowerCase()}.png`}
                      alt={`ランク${rank}`}
                      className="w-6 h-6 drop-shadow-sm"
                    />
                    <span className="text-slate-500 text-xs w-8 text-right tabular-nums">
                      {ability.score}
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={ability.score}
                  onChange={e => handleChange(index, Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 accent-blue-500"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
