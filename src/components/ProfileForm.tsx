import type { EngineerProfile } from '../types/ability'

interface ProfileFormProps {
  profile: EngineerProfile
  onChange: (profile: EngineerProfile) => void
}

export default function ProfileForm({ profile, onChange }: ProfileFormProps) {
  const update = (field: keyof EngineerProfile, value: string) => {
    onChange({ ...profile, [field]: value })
  }

  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-5">
      <h2 className="text-blue-300 text-xs tracking-widest uppercase mb-4">
        — Basic Info —
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-400 text-xs mb-1">表示名</label>
          <input
            type="text"
            value={profile.name}
            onChange={e => update('name', e.target.value)}
            placeholder="例：山田 太郎"
            className="w-full bg-slate-700 border border-slate-500 focus:border-blue-400 text-white rounded px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1">タイプ名</label>
          <input
            type="text"
            value={profile.typeName}
            onChange={e => update('typeName', e.target.value)}
            placeholder="例：バックエンドエンジニア"
            className="w-full bg-slate-700 border border-slate-500 focus:border-blue-400 text-white rounded px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-400 text-xs mb-1">一言コメント</label>
          <input
            type="text"
            value={profile.comment}
            onChange={e => update('comment', e.target.value)}
            placeholder="例：コードで課題を解くのが好きです"
            className="w-full bg-slate-700 border border-slate-500 focus:border-blue-400 text-white rounded px-3 py-2 text-sm outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}
