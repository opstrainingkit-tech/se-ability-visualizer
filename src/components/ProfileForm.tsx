import type { EngineerProfile } from '../types/ability'

interface ProfileFormProps {
  profile: EngineerProfile
  onChange: (profile: EngineerProfile) => void
}

const inputClass =
  'w-full bg-white border border-slate-300 focus:border-blue-500 text-slate-900 placeholder-slate-400 rounded-lg px-3 py-2 text-sm outline-none transition-colors'

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const update = (field: keyof EngineerProfile, value: string) => {
    onChange({ ...profile, [field]: value })
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl p-5 shadow-lg shadow-blue-900/10">
      <img
        src="/assets/tabs/tab-basic-info.png"
        alt="基本情報"
        className="h-11 mx-auto mb-5"
      />

      <div className="space-y-4">
        <div>
          <label className="block text-slate-500 text-xs mb-1">表示名</label>
          <input
            type="text"
            value={profile.name}
            onChange={e => update('name', e.target.value)}
            placeholder="例：山田 太郎"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-slate-500 text-xs mb-1">タイプ名</label>
          <input
            type="text"
            value={profile.typeName}
            onChange={e => update('typeName', e.target.value)}
            placeholder="例：バックエンドエンジニア"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-slate-500 text-xs mb-1">一言コメント</label>
          <input
            type="text"
            value={profile.comment}
            onChange={e => update('comment', e.target.value)}
            placeholder="例：コードで課題を解くのが好きです"
            className={inputClass}
          />
        </div>
      </div>
    </div>
  )
}
