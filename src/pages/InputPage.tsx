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
    <div className="min-h-screen bg-slate-900 text-white">

      {/* ヘッダー */}
      <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white text-sm transition-colors"
        >
          ← トップへ戻る
        </button>
        <span className="text-blue-300 text-xs tracking-widest uppercase">
          Ability Input
        </span>
      </div>

      {/* フォームエリア */}
      <div className="max-w-lg mx-auto px-6 py-8 space-y-6">

        {/* 基本情報 */}
        <ProfileForm profile={profile} onChange={onProfileChange} />

        {/* メイン能力入力 */}
        <MainAbilityForm
          mainAbilities={mainAbilities}
          onChange={onMainAbilitiesChange}
        />

        {/* 特殊能力選択 */}
        <SpecialAbilitySelector
          specialAbilities={specialAbilities}
          onChange={onSpecialAbilitiesChange}
        />

        {/* 送信ボタン */}
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors tracking-wide"
        >
          ▶ 結果を見る
        </button>

      </div>
    </div>
  )
}
