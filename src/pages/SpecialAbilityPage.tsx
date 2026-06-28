import { useMemo, useState } from 'react'
import type { SpecialAbilityCategory, SpecialAbilityType } from '../types/ability'
import {
  specialAbilityMaster,
  specialTypeOrder,
  specialTypeMeta,
  categoryLabel,
  resolveSpecialAbilities,
  SPECIAL_SELECT_LIMIT,
} from '../data/specialAbilities'

interface SpecialAbilityPageProps {
  selectedIds: string[]
  onChange: (ids: string[]) => void
}

// 種別 → バッジ配色
const typeBadge: Record<SpecialAbilityType, string> = {
  normal: 'bg-blue-100 text-blue-700',
  rare: 'bg-red-100 text-red-700',
  achievement: 'bg-amber-100 text-amber-800',
  ai: 'bg-purple-100 text-purple-700',
  certification: 'bg-green-100 text-green-700',
  negative: 'bg-slate-700 text-white',
  growth: 'bg-slate-200 text-slate-600',
}
const typeDot: Record<SpecialAbilityType, string> = {
  normal: 'bg-blue-500',
  rare: 'bg-red-500',
  achievement: 'bg-amber-500',
  ai: 'bg-purple-500',
  certification: 'bg-green-500',
  negative: 'bg-slate-800',
  growth: 'bg-slate-400',
}
const shortTypeLabel = (t: SpecialAbilityType) => specialTypeMeta[t].label.replace('能力', '')

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-slate-400">
      <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  )
}

export default function SpecialAbilityPage({ selectedIds, onChange }: SpecialAbilityPageProps) {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState<SpecialAbilityType | 'all'>('all')
  const [activeCategory, setActiveCategory] = useState<SpecialAbilityCategory | 'all'>('all')

  const limitReached = selectedIds.length >= SPECIAL_SELECT_LIMIT
  const selected = resolveSpecialAbilities(selectedIds)

  const toggle = (id: string) => {
    if (selectedIds.includes(id)) onChange(selectedIds.filter(x => x !== id))
    else if (!limitReached) onChange([...selectedIds, id])
  }

  // 種別で絞った母集団（カテゴリチップの候補算出に使う）
  const byType = useMemo(
    () => (activeType === 'all' ? specialAbilityMaster : specialAbilityMaster.filter(a => a.type === activeType)),
    [activeType]
  )

  // 種別内に存在するカテゴリだけチップ表示
  const categories = useMemo(() => {
    const set = new Set<SpecialAbilityCategory>()
    byType.forEach(a => set.add(a.category))
    return Array.from(set)
  }, [byType])

  const list = useMemo(() => {
    const q = search.trim().toLowerCase()
    return byType.filter(a => {
      if (activeCategory !== 'all' && a.category !== activeCategory) return false
      if (q) {
        const hit = a.name.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q))
        if (!hit) return false
      }
      return true
    })
  }, [byType, activeCategory, search])

  // 種別タブを切り替えたらカテゴリは「すべて」に戻す
  const changeType = (t: SpecialAbilityType | 'all') => {
    setActiveType(t)
    setActiveCategory('all')
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/60 px-5 py-3">
        <h1 className="text-blue-900 font-bold text-lg text-center">特殊能力</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 pb-28 space-y-4">

        {/* 選択済みエリア */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl p-4 shadow-lg shadow-blue-900/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-500 text-xs font-semibold tracking-wide uppercase">選択済み</span>
            <span className={`text-xs font-bold tabular-nums ${limitReached ? 'text-orange-500' : 'text-slate-500'}`}>
              {selected.length} / {SPECIAL_SELECT_LIMIT}
            </span>
          </div>
          {selected.length === 0 ? (
            <p className="text-slate-400 text-xs py-1">まだ選択されていません</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {selected.map(a => (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  className={`flex items-center gap-1 text-xs font-medium pl-2.5 pr-1.5 py-1 rounded-full ${typeBadge[a.type]}`}
                >
                  {a.name}
                  <span className="opacity-70 leading-none">✕</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 検索欄 */}
        <div className="flex items-center gap-2 bg-white/90 border border-white/60 rounded-full px-4 py-2 shadow-sm">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="特殊能力を検索"
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-slate-400 text-sm">✕</button>
          )}
        </div>

        {/* 種別チップタブ（横スクロール） */}
        <div className="-mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {(['all', ...specialTypeOrder] as const).map(t => {
              const isActive = activeType === t
              const label = t === 'all' ? 'すべて' : shortTypeLabel(t)
              return (
                <button
                  key={t}
                  onClick={() => changeType(t)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'bg-white/80 border-slate-300 text-slate-600'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* カテゴリチップ（横スクロール） */}
        <div className="-mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {(['all', ...categories] as const).map(c => {
              const isActive = activeCategory === c
              const label = c === 'all' ? 'カテゴリ：すべて' : categoryLabel[c]
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    isActive
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white/70 border-slate-200 text-slate-500'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 候補一覧（コンパクト行） */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl shadow-lg shadow-blue-900/10 overflow-hidden divide-y divide-slate-100">
          {list.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">該当する特殊能力がありません</p>
          ) : (
            list.map(a => {
              const isSelected = selectedIds.includes(a.id)
              const disabled = !isSelected && limitReached
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  disabled={disabled}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors ${
                    isSelected ? 'bg-blue-50/70' : disabled ? 'opacity-40' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${typeDot[a.type]}`} />
                  <span className="flex-1 text-sm text-slate-800 truncate">{a.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeBadge[a.type]}`}>
                    {shortTypeLabel(a.type)}
                  </span>
                  <span className="text-[10px] text-slate-400 max-w-16 truncate hidden min-[360px]:inline">
                    {categoryLabel[a.category]}
                  </span>
                  <span
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-sm font-bold ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isSelected ? '✓' : '＋'}
                  </span>
                </button>
              )
            })
          )}
        </div>

      </div>
    </div>
  )
}
