import type { AbilityCardData, EngineerProfile, MainAbility } from '../types/ability'

const KEY = 'se-ability-card'

// 旧形式（特殊能力が selected を持つ配列）を含む保存データの型
interface StoredShape {
  profile?: EngineerProfile
  mainAbilities?: MainAbility[]
  selectedSpecialIds?: string[]
  // legacy: { id, label, selected }[]
  specialAbilities?: { id: string; selected?: boolean }[]
}

export function saveToStorage(data: AbilityCardData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // ストレージ容量超過などは無視
  }
}

export function loadFromStorage(): Partial<AbilityCardData> | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StoredShape
    const result: Partial<AbilityCardData> = {}

    if (parsed.profile) result.profile = parsed.profile
    if (Array.isArray(parsed.mainAbilities)) result.mainAbilities = parsed.mainAbilities

    if (Array.isArray(parsed.selectedSpecialIds)) {
      result.selectedSpecialIds = parsed.selectedSpecialIds
    } else if (Array.isArray(parsed.specialAbilities)) {
      // 旧形式からの移行：selected な特殊能力のidだけ引き継ぐ
      result.selectedSpecialIds = parsed.specialAbilities
        .filter(a => a && a.selected)
        .map(a => a.id)
    }

    return result
  } catch {
    return null
  }
}
