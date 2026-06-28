import { useEffect, useState } from 'react'
import type { EngineerProfile, MainAbility } from './types/ability'
import { initialMainAbilities } from './data/abilities'
import { sanitizeSelectedIds } from './data/specialAbilities'
import { loadFromStorage, saveToStorage } from './utils/storage'
import { trackStartInput, trackShowResult, trackBackToInput, trackResetForm } from './utils/analytics'
import BottomNav from './components/BottomNav'
import type { TabKey } from './components/BottomNav'
import TopPage from './pages/TopPage'
import StatusInputPage from './pages/StatusInputPage'
import SpecialAbilityPage from './pages/SpecialAbilityPage'
import ResultPage from './pages/ResultPage'

function App() {
  const [tab, setTab] = useState<TabKey>('top')
  const [showResult, setShowResult] = useState(false)

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

  const openResult = () => {
    trackShowResult()
    setShowResult(true)
  }

  const handleReset = () => {
    setProfile({ name: '', typeName: '', comment: '' })
    setMainAbilities(initialMainAbilities)
    setSelectedSpecialIds([])
  }

  const goTab = (t: TabKey) => {
    setShowResult(false)
    setTab(t)
  }

  return (
    <div>
      {showResult ? (
        <ResultPage
          data={{ profile, mainAbilities, selectedSpecialIds }}
          onBack={() => { trackBackToInput(); setShowResult(false) }}
          onReset={() => { trackResetForm(); handleReset(); setShowResult(false); setTab('top') }}
        />
      ) : (
        <>
          {tab === 'top' && (
            <TopPage
              onStart={() => { trackStartInput(); setTab('status') }}
              onShowResult={openResult}
            />
          )}

          {tab === 'status' && (
            <StatusInputPage
              profile={profile}
              mainAbilities={mainAbilities}
              onProfileChange={setProfile}
              onMainAbilitiesChange={setMainAbilities}
              onShowResult={openResult}
            />
          )}

          {tab === 'special' && (
            <SpecialAbilityPage
              selectedIds={selectedSpecialIds}
              onChange={setSelectedSpecialIds}
            />
          )}
        </>
      )}

      <BottomNav
        active={showResult ? null : tab}
        onChange={goTab}
        selectedCount={selectedSpecialIds.length}
      />
    </div>
  )
}

export default App
