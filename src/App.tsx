import { useEffect, useState } from 'react'
import type { EngineerProfile, MainAbility } from './types/ability'
import type { AssessmentAnswers, StatKey, StatScore } from './types/assessment'
import type { TitleContext } from './types/title'
import { STAT_KEYS, statToMainAbility } from './types/assessment'
import { initialMainAbilities } from './data/abilities'
import { sanitizeSelectedIds } from './data/specialAbilities'
import { SELECT_LIMIT } from './data/assessmentQuestions'
import { runAssessment } from './utils/assessment'
import { computeTitle } from './utils/title'
import { computeInsights } from './utils/insights'
import { loadFromStorage, saveToStorage } from './utils/storage'
import { trackStartInput, trackShowResult, trackBackToInput, trackResetForm } from './utils/analytics'
import BottomNav from './components/BottomNav'
import type { TabKey, NavKey } from './components/BottomNav'
import TopPage from './pages/TopPage'
import StatusInputPage from './pages/StatusInputPage'
import SpecialAbilityPage from './pages/SpecialAbilityPage'
import AssessmentPage from './pages/AssessmentPage'
import ResultPage from './pages/ResultPage'

function App() {
  const [tab, setTab] = useState<TabKey>('top')
  const [showResult, setShowResult] = useState(false)
  const [showAssessment, setShowAssessment] = useState(false)

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
  const [titleContext, setTitleContext] = useState<TitleContext | undefined>(
    saved?.titleContext
  )

  // 状態変化時に自動保存
  useEffect(() => {
    saveToStorage({ profile, mainAbilities, selectedSpecialIds, titleContext })
  }, [profile, mainAbilities, selectedSpecialIds, titleContext])

  // mainAbilities から称号算出用の StatScore を作る
  const stats: StatScore = STAT_KEYS.reduce((acc, k) => {
    const a = mainAbilities.find(m => m.id === statToMainAbility[k])
    acc[k] = a ? a.score : 0
    return acc
  }, {} as StatScore)
  const title = computeTitle(stats, selectedSpecialIds, titleContext ?? {})
  const insights = computeInsights(stats, titleContext ?? {})

  const openResult = () => {
    trackShowResult()
    setShowResult(true)
  }

  const handleReset = () => {
    setProfile({ name: '', typeName: '', comment: '' })
    setMainAbilities(initialMainAbilities)
    setSelectedSpecialIds([])
    setTitleContext(undefined)
  }

  // アンケート完了 → 7能力へ反映＋おすすめを最大8個まで自動選択
  const handleAssessmentComplete = (answers: AssessmentAnswers) => {
    const result = runAssessment(answers)
    setMainAbilities(prev =>
      prev.map(a => {
        const statKey = STAT_KEYS.find(k => statToMainAbility[k] === a.id) as StatKey | undefined
        return statKey ? { ...a, score: result.stats[statKey] } : a
      })
    )
    setSelectedSpecialIds(result.suggestedAbilities.slice(0, SELECT_LIMIT).map(s => s.abilityId))
    // 称号算出用のコンテキストを保持（Q31/Q32・スケール回答）
    setTitleContext({
      scaleAnswers: answers.scale,
      emphasis: (answers.select['q32'] ?? [])[0],
      role: (answers.select['q31'] ?? [])[0],
    })
    setShowAssessment(false)
    trackShowResult()
    setShowResult(true)
  }

  const goTab = (key: NavKey) => {
    setShowResult(false)
    if (key === 'assessment') {
      setShowAssessment(true)
      return
    }
    setShowAssessment(false)
    setTab(key)
  }

  // アンケート（全画面・下部ナビ非表示）
  if (showAssessment) {
    return (
      <AssessmentPage
        onComplete={handleAssessmentComplete}
        onCancel={() => setShowAssessment(false)}
      />
    )
  }

  return (
    <div>
      {showResult ? (
        <ResultPage
          data={{ profile, mainAbilities, selectedSpecialIds }}
          title={title}
          insights={insights}
          onBack={() => { trackBackToInput(); setShowResult(false) }}
          onReset={() => { trackResetForm(); handleReset(); setShowResult(false); setTab('top') }}
        />
      ) : (
        <>
          {tab === 'top' && (
            <TopPage
              onStart={() => { trackStartInput(); setTab('status') }}
              onShowResult={openResult}
              onStartAssessment={() => setShowAssessment(true)}
            />
          )}

          {tab === 'status' && (
            <StatusInputPage
              profile={profile}
              mainAbilities={mainAbilities}
              onProfileChange={setProfile}
              onMainAbilitiesChange={setMainAbilities}
              onShowResult={openResult}
              onStartAssessment={() => setShowAssessment(true)}
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
