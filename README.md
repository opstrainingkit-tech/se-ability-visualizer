# SE Ability Visualizer

ITエンジニアの能力をステータスカード風に可視化するWebアプリ。

能力値を自分で入力すると、ゲームのステータス画面風に表示されます。
結果をスクリーンショットしてSNSでシェアできます。

## 機能（MVP）

- 基本情報の入力（表示名・タイプ名・コメント）
- メイン能力 7項目をスライダーで入力（0〜100）
- 特殊能力 20項目をタグ選択
- 入力値に応じた S〜G ランク表示
- ステータスカード風の結果画面
- 入力内容の localStorage 自動保存
- PWA対応（スマホのホーム画面に追加可能）

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | React + Vite + TypeScript |
| スタイル | Tailwind CSS v4 |
| スマホ対応 | PWA（vite-plugin-pwa） |
| デプロイ | Vercel |

## 開発環境のセットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## ディレクトリ構成

```
src/
  components/   # UIコンポーネント
  pages/        # 画面コンポーネント
  data/         # 初期データ
  types/        # 型定義
  utils/        # ユーティリティ関数
```

## 作らなかったもの（MVP除外）

- ログイン / DB保存
- 診断機能（自動スコア算出）
- AI自動診断
- PDF出力
- SNS自動共有
- 管理画面
