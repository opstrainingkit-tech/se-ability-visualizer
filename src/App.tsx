import { useEffect, useState } from 'react'
import type { EngineerProfile, MainAbility } from './types/ability'
import { initialMainAbilities } from './data/abilities'
import { sanitizeSelectedIds } from './data/specialAbilities'
import { loadFromStorage, saveToStorage } from './utils/storage'
import { trackStartInput, trackShowResult, trackBackToInput, trackResetForm } from './utils/analytics'
import TopPage from './pages/TopPage'
import InputPage from './pages/InputPage'
import ResultPage from './pages/ResultPage'

export type Screen = 'top' | 'input' | 'result'

function App() {
  const [screen, setScreen] = useState<Screen>('top')

  const saved = loadFromStorage()

  const [profile, setProfile] = useState<EngineerProfile>(
    saved?.profile ?? { name: '', typeName: '', comment: '' }
  )
  const [mainAbilities, setMainAbilities] = useState<MainAbility[]>(
    saved?.mainAbilities ?? initialMainAbilities
  )
  const [selectedSpecialIds, setSelectedSpecialIds] = useState<string[]>(
    sanitizeSelectedIds(saved?.selectedSpecialIds)
  )

  // 状態変化時に自動保存
  useEffect(() => {
    saveToStorage({ profile, mainAbilities, selectedSpecialIds })
  }, [profile, mainAbilities, selectedSpecialIds])

  const handleReset = () => {
    setProfile({ name: '', typeName: '', comment: '' })
    setMainAbilities(initialMainAbilities)
    setSelectedSpecialIds([])
  }

  return (
    <div>
      {screen === 'top' && (
        <TopPage onStart={() => { trackStartInput(); setScreen('input') }} />
      )}

      {screen === 'input' && (
        <InputPage
          profile={profile}
          mainAbilities={mainAbilities}
          selectedSpecialIds={selectedSpecialIds}
          onProfileChange={setProfile}
          onMainAbilitiesChange={setMainAbilities}
          onSelectedSpecialIdsChange={setSelectedSpecialIds}
          onSubmit={() => { trackShowResult(); setScreen('result') }}
          onBack={() => setScreen('top')}
        />
      )}

      {screen === 'result' && (
        <ResultPage
          data={{ profile, mainAbilities, selectedSpecialIds }}
          onBack={() => { trackBackToInput(); setScreen('input') }}
          onReset={() => { trackResetForm(); handleReset(); setScreen('top') }}
        />
      )}
    </div>
  )
}

export default App
