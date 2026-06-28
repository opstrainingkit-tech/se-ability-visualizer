import { specialAbilityMaster, SPECIAL_SELECT_LIMIT } from '../data/specialAbilities'

interface SpecialAbilitySelectorProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

export default function SpecialAbilitySelector({
  selectedIds,
  onChange,
}: SpecialAbilitySelectorProps) {
  const selectedCount = selectedIds.length
  const limitReached = selectedCount >= SPECIAL_SELECT_LIMIT

  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(x => x !== id))
    } else {
      if (limitReached) return
      onChange([...selectedIds, id])
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl p-5 shadow-lg shadow-blue-900/10">
      <div className="relative mb-5">
        <img
          src="/assets/tabs/tab-special-ability.png"
          alt="特殊能力"
          className="h-11 mx-auto"
        />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 text-xs tabular-nums">
          {selectedCount} / {SPECIAL_SELECT_LIMIT}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {specialAbilityMaster.map(ability => {
          const isSelected = selectedIds.includes(ability.id)
          const disabled = !isSelected && limitReached
          return (
            <button
              key={ability.id}
              onClick={() => toggle(ability.id)}
              disabled={disabled}
              className={`
                px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-150
                ${isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : disabled
                    ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400 hover:text-blue-600'
                }
              `}
            >
              {isSelected && <span className="mr-1">✓</span>}
              {ability.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
