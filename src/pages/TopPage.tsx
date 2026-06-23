interface TopPageProps {
  onStart: () => void
}

export default function TopPage({ onStart }: TopPageProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgrounds/background-sky.png')" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">

        {/* ロゴ（タイトル＋装飾） */}
        <img
          src="/assets/backgrounds/app-logo.png"
          alt="SE Ability Visualizer — SEアビリティ可視化アプリ"
          className="w-full max-w-xs rounded-2xl shadow-xl shadow-blue-900/30 ring-1 ring-white/50 mb-8"
        />

        {/* 説明文 */}
        <p className="text-blue-950 font-medium text-sm leading-relaxed mb-8 text-center bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm">
          ITエンジニアの能力を<br className="sm:hidden" />ステータス画面風に可視化します
        </p>

        {/* 開始ボタン（画像ボタン＋テキスト） */}
        <button
          onClick={onStart}
          aria-label="能力を入力する"
          className="relative w-72 h-16 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          style={{
            backgroundImage: "url('/assets/buttons/button-pill-blue.png')",
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <span className="text-white font-bold text-lg tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
            ▶ 能力を入力する
          </span>
        </button>

        {/* フッターラベル */}
        <p className="text-white text-xs mt-6 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          ver 0.1.0 MVP
        </p>
      </div>
    </div>
  )
}
