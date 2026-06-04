interface TopPageProps {
  onStart: () => void
}

export default function TopPage({ onStart }: TopPageProps) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* ゲーム風パネル */}
        <div className="border-2 border-blue-400 bg-slate-800 rounded-lg p-8 text-center shadow-lg shadow-blue-900/50">

          {/* ヘッダーラベル */}
          <p className="text-blue-400 text-xs tracking-[0.3em] mb-6 uppercase">
            — Status System —
          </p>

          {/* アプリ名 */}
          <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
            SE Ability
          </h1>
          <h1 className="text-3xl font-bold text-blue-300 mb-6 tracking-wide">
            Visualizer
          </h1>

          {/* 区切り線 */}
          <div className="border-t border-slate-600 mb-6" />

          {/* 説明文 */}
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            ITエンジニアの能力を<br />
            ステータス画面風に可視化します
          </p>

          {/* 開始ボタン */}
          <button
            onClick={onStart}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 tracking-wide"
          >
            ▶ 能力を入力する
          </button>

          {/* フッターラベル */}
          <p className="text-slate-600 text-xs mt-6">
            ver 0.1.0 MVP
          </p>
        </div>

      </div>
    </div>
  )
}
