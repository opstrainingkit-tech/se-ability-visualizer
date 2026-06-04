import type { AbilityCardData } from '../types/ability'

const KEY = 'se-ability-card'

export function saveToStorage(data: Omit<AbilityCardData, never>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    // ストレージ容量超過などは無視
  }
}

export function loadFromStorage(): Partial<AbilityCardData> | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Partial<AbilityCardData>) : null
  } catch {
    return null
  }
}
