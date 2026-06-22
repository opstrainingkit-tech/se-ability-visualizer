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
    <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl p-5 shadow-lg shadow-blue-900/10">
      <div className="relative mb-5">
        <img
          src="/assets/tabs/tab-special-ability.png"
          alt="特殊能力"
          className="h-11 mx-auto"
        />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 text-xs">
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
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600'
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
