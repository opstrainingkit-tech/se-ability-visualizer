import { useState } from 'react'
import type { EngineerProfile, MainAbility, SpecialAbility } from './types/ability'
import { initialMainAbilities, initialSpecialAbilities } from './data/abilities'
import TopPage from './pages/TopPage'

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
        <div>
          <h1 className="text-2xl font-bold mb-4">入力画面（仮）</h1>
          <p className="mb-2 text-slate-300">
            メイン能力: {mainAbilities.length}項目 / 特殊能力: {specialAbilities.length}項目
          </p>
          <input
            className="block mb-4 bg-slate-700 px-3 py-2 rounded"
            placeholder="表示名を入力"
            value={profile.name}
            onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
          />
          <div className="flex gap-4">
            <button
              className="bg-blue-600 px-4 py-2 rounded"
              onClick={() => setScreen('result')}
            >
              結果を見る
            </button>
            <button
              className="bg-slate-600 px-4 py-2 rounded"
              onClick={() => setScreen('top')}
            >
              トップへ戻る
            </button>
            <button
              className="bg-red-800 px-4 py-2 rounded"
              onClick={handleReset}
            >
              リセット
            </button>
          </div>
        </div>
      )}

      {screen === 'result' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">結果画面（仮）</h1>
          <p className="mb-2 text-slate-300">名前: {profile.name || '未入力'}</p>
          <p className="mb-4 text-slate-300">
            選択済み特殊能力: {specialAbilities.filter(s => s.selected).length}件
          </p>
          <button
            className="bg-slate-600 px-4 py-2 rounded"
            onClick={() => setScreen('input')}
          >
            入力に戻る
          </button>
        </div>
      )}
    </div>
  )
}

export default App
