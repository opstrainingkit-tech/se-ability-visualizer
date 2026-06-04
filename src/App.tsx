import { useState } from 'react'
import type { EngineerProfile, MainAbility, SpecialAbility } from './types/ability'
import { initialMainAbilities, initialSpecialAbilities } from './data/abilities'
import TopPage from './pages/TopPage'
import InputPage from './pages/InputPage'

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
        <div className="min-h-screen bg-slate-900 text-white p-8">
          <h1 className="text-2xl font-bold mb-4">結果画面（仮）</h1>
          <p className="mb-2 text-slate-300">名前: {profile.name || '未入力'}</p>
          <p className="mb-4 text-slate-300">
            選択済み特殊能力: {specialAbilities.filter(s => s.selected).length}件
          </p>
          <div className="flex gap-4">
            <button
              className="bg-slate-600 px-4 py-2 rounded"
              onClick={() => setScreen('input')}
            >
              入力に戻る
            </button>
            <button
              className="bg-red-800 px-4 py-2 rounded"
              onClick={handleReset}
            >
              最初からやり直す
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
