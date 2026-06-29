interface TopPageProps {
  onStart: () => void
  onShowResult: () => void
}

export default function TopPage({ onStart, onShowResult }: TopPageProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 pb-28 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">

        {/* ロゴ（タイトル＋装飾） */}
        <img
          src="/assets/backgrounds/app-logo.png"
          alt="SE Ability Visualizer — SEアビリティ可視化アプリ"
          className="w-full max-w-xs rounded-2xl shadow-xl shadow-blue-900/30 ring-1 ring-white/50 mb-7"
        />

        {/* 説明文 */}
        <p className="text-blue-950 font-medium text-sm leading-relaxed mb-7 text-center bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-sm">
          ITエンジニアの能力を<br className="sm:hidden" />ステータス画面風に可視化します
          <br />
          <span className="text-blue-700 text-xs">
            ① ステータス入力 → ② アビリティを選ぶ → ③ 結果を見る
          </span>
        </p>

        {/* 開始ボタン（画像ボタン＋テキスト） */}
        <button
          onClick={onStart}
          aria-label="はじめる"
          className="relative w-72 h-16 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            backgroundImage: "url('/assets/buttons/button-pill-blue.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <span className="text-white font-bold text-lg tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            ▶ はじめる
          </span>
        </button>

        {/* 結果を見る */}
        <button
          onClick={onShowResult}
          className="mt-4 text-blue-800 text-sm font-semibold underline-offset-4 hover:underline drop-shadow-sm"
        >
          結果を見る
        </button>

        <p className="text-white text-xs mt-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          ver 0.1.0 MVP
        </p>
      </div>
    </div>
  )
}
