import type { EngineerProfile, MainAbility, SpecialAbility } from '../types/ability'
import ProfileForm from '../components/ProfileForm'

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

        {/* タスク12・13でここに追加 */}
        <div className="bg-slate-800 border border-dashed border-slate-600 rounded-lg p-5 text-center text-slate-500 text-sm">
          メイン能力入力（タスク12で追加）
          <br />
          <span className="text-xs">{mainAbilities.length}項目</span>
        </div>

        <div className="bg-slate-800 border border-dashed border-slate-600 rounded-lg p-5 text-center text-slate-500 text-sm">
          特殊能力選択（タスク13で追加）
          <br />
          <span className="text-xs">{specialAbilities.length}項目</span>
        </div>

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
