import type { SpecialAbility } from '../types/ability'

interface SpecialAbilitySelectorProps {
  specialAbilities: SpecialAbility[]
  onChange: (abilities: SpecialAbility[]) => void
}

export default function SpecialAbilitySelector({
  specialAbilities,
  onChange,
}: SpecialAbilitySelectorProps) {
  const toggle = (id: string) => {
    onChange(
      specialAbilities.map(a => a.id === id ? { ...a, selected: !a.selected } : a)
    )
  }

  const selectedCount = specialAbilities.filter(a => a.selected).length

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-blue-300 text-xs tracking-widest uppercase">
          — Special Abilities —
        </h2>
        <span className="text-slate-400 text-xs">
          {selectedCount} 選択中
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {specialAbilities.map(ability => (
          <button
            key={ability.id}
            onClick={() => toggle(ability.id)}
            className={`
              px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150
              ${ability.selected
                ? 'bg-blue-600 border-blue-400 text-white'
                : 'bg-slate-700 border-slate-500 text-slate-300 hover:border-blue-400 hover:text-white'
              }
            `}
          >
            {ability.selected && <span className="mr-1">✓</span>}
            {ability.label}
          </button>
        ))}
      </div>
    </div>
  )
}
