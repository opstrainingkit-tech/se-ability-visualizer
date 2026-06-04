import type { MainAbility } from '../types/ability'
import { getRank } from '../utils/getRank'

interface MainAbilityFormProps {
  mainAbilities: MainAbility[]
  onChange: (abilities: MainAbility[]) => void
}

const rankColor: Record<string, string> = {
  S: 'text-yellow-300',
  A: 'text-orange-300',
  B: 'text-green-300',
  C: 'text-blue-300',
  D: 'text-slate-300',
  E: 'text-slate-400',
  F: 'text-slate-500',
  G: 'text-slate-600',
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
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-5">
      <h2 className="text-blue-300 text-xs tracking-widest uppercase mb-4">
        — Main Abilities —
      </h2>

      <div className="space-y-4">
        {mainAbilities.map((ability, index) => {
          const rank = getRank(ability.score)
          return (
            <div key={ability.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white">{ability.label}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold w-4 text-center ${rankColor[rank]}`}>
                    {rank}
                  </span>
                  <span className="text-slate-400 text-xs w-8 text-right">
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
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-600 accent-blue-400"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
