import { useEffect, useState } from 'react'
import type { EngineerProfile, MainAbility, SpecialAbility } from './types/ability'
import { initialMainAbilities, initialSpecialAbilities } from './data/abilities'
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
  const [specialAbilities, setSpecialAbilities] = useState<SpecialAbility[]>(
    saved?.specialAbilities ?? initialSpecialAbilities
  )

  // 状態変化時に自動保存
  useEffect(() => {
    saveToStorage({ profile, mainAbilities, specialAbilities })
  }, [profile, mainAbilities, specialAbilities])

  const handleReset = () => {
    setProfile({ name: '', typeName: '', comment: '' })
    setMainAbilities(initialMainAbilities)
    setSpecialAbilities(initialSpecialAbilities)
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
          specialAbilities={specialAbilities}
          onProfileChange={setProfile}
          onMainAbilitiesChange={setMainAbilities}
          onSpecialAbilitiesChange={setSpecialAbilities}
          onSubmit={() => { trackShowResult(); setScreen('result') }}
          onBack={() => setScreen('top')}
        />
      )}

      {screen === 'result' && (
        <ResultPage
          data={{ profile, mainAbilities, specialAbilities }}
          onBack={() => { trackBackToInput(); setScreen('input') }}
          onReset={() => { trackResetForm(); handleReset(); setScreen('top') }}
        />
      )}
    </div>
  )
}

export default App
