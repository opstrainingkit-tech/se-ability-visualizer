import { useState } from 'react'
import type { EngineerProfile, MainAbility, SpecialAbility } from './types/ability'
import { initialMainAbilities, initialSpecialAbilities } from './data/abilities'
import TopPage from './pages/TopPage'
import InputPage from './pages/InputPage'
import ResultPage from './pages/ResultPage'

export type Screen = 'top' | 'input' | 'result'

function App() {
  const [screen, setScreen] = useState<Screen>('top')

  const [profile, setProfile] = useState<EngineerProfile>({
    name: '',
    typeName: '',
    comment: '',
  })
  const [mainAbilities, setMainAbilities] = useState<MainAbility[]>(initialMainAbilities)
  const [specialAbilities, setSpecialAbilities] = useState<SpecialAbility[]>(initialSpecialAbilities)

  const handleReset = () => {
    setProfile({ name: '', typeName: '', comment: '' })
    setMainAbilities(initialMainAbilities)
    setSpecialAbilities(initialSpecialAbilities)
  }

  return (
    <div>
      {screen === 'top' && (
        <TopPage onStart={() => setScreen('input')} />
      )}

      {screen === 'input' && (
        <InputPage
          profile={profile}
          mainAbilities={mainAbilities}
          specialAbilities={specialAbilities}
          onProfileChange={setProfile}
          onMainAbilitiesChange={setMainAbilities}
          onSpecialAbilitiesChange={setSpecialAbilities}
          onSubmit={() => setScreen('result')}
          onBack={() => setScreen('top')}
        />
      )}

      {screen === 'result' && (
        <ResultPage
          data={{ profile, mainAbilities, specialAbilities }}
          onBack={() => setScreen('input')}
          onReset={() => { handleReset(); setScreen('top') }}
        />
      )}
    </div>
  )
}

export default App
