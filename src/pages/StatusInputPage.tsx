import type { EngineerProfile, MainAbility } from '../types/ability'
import ProfileForm from '../components/ProfileForm'
import MainAbilityForm from '../components/MainAbilityForm'

interface StatusInputPageProps {
  profile: EngineerProfile
  mainAbilities: MainAbility[]
  onProfileChange: (profile: EngineerProfile) => void
  onMainAbilitiesChange: (abilities: MainAbility[]) => void
  onShowResult: () => void
}

export default function StatusInputPage({
  profile,
  mainAbilities,
  onProfileChange,
  onMainAbilitiesChange,
  onShowResult,
}: StatusInputPageProps) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/60 px-5 py-3">
        <h1 className="text-blue-900 font-bold text-lg text-center">ステータス</h1>
      </div>

      {/* フォームエリア */}
      <div className="max-w-lg mx-auto px-5 py-6 pb-28 space-y-6">

        <ProfileForm profile={profile} onChange={onProfileChange} />

        <MainAbilityForm mainAbilities={mainAbilities} onChange={onMainAbilitiesChange} />

        {/* 結果ボタン（画像ボタン＋テキスト） */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onShowResult}
            aria-label="結果を見る"
            className="relative w-72 h-16 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{
              backgroundImage: "url('/assets/buttons/button-pill-blue.png')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <span className="text-white font-bold text-lg tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              ▶ 結果を見る
            </span>
          </button>
        </div>

        <p className="text-center text-blue-900/70 text-xs">
          特殊能力は下のメニューから選べます
        </p>

      </div>
    </div>
  )
}
