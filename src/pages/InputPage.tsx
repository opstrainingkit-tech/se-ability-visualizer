import type { EngineerProfile, MainAbility, SpecialAbility } from '../types/ability'
import ProfileForm from '../components/ProfileForm'
import MainAbilityForm from '../components/MainAbilityForm'
import SpecialAbilitySelector from '../components/SpecialAbilitySelector'

interface InputPageProps {
  profile: EngineerProfile
  mainAbilities: MainAbility[]
  specialAbilities: SpecialAbility[]
  onProfileChange: (profile: EngineerProfile) => void
  onMainAbilitiesChange: (abilities: MainAbility[]) => void
  onSpecialAbilitiesChange: (abilities: SpecialAbility[]) => void
  onSubmit: () => void
  onBack: () => void
}

export default function InputPage({
  profile,
  mainAbilities,
  specialAbilities,
  onProfileChange,
  onMainAbilitiesChange,
  onSpecialAbilitiesChange,
  onSubmit,
  onBack,
}: InputPageProps) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-md border-b border-white/60 px-5 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-blue-700 hover:text-blue-900 text-sm font-medium transition-colors"
        >
          ← トップへ戻る
        </button>
        <span className="text-blue-500 text-xs tracking-widest uppercase font-semibold">
          Ability Input
        </span>
      </div>

      {/* フォームエリア */}
      <div className="max-w-lg mx-auto px-5 py-8 space-y-6">

        <ProfileForm profile={profile} onChange={onProfileChange} />

        <MainAbilityForm
          mainAbilities={mainAbilities}
          onChange={onMainAbilitiesChange}
        />

        <SpecialAbilitySelector
          specialAbilities={specialAbilities}
          onChange={onSpecialAbilitiesChange}
        />

        {/* 送信ボタン（画像ボタン＋テキスト） */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onSubmit}
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

      </div>
    </div>
  )
}
