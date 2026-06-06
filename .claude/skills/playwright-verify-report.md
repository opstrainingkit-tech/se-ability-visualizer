# Playwright 動作確認 → レポート作成 → PR作成

Playwright でアプリの動作確認を行い、スクリーンショット付きレポートをまとめて GitHub PR を作成するスキル。

## 使い方

```
/playwright-verify-report [タスク名] [対象URL]
```

- `タスク名` — レポートのファイル名・ブランチ名に使用（例: `task22`, `v1.1-release`）
- `対象URL` — 省略時は `https://se-ability-visualizer.vercel.app/`

例:
```
/playwright-verify-report task22
/playwright-verify-report v1.1-release https://se-ability-visualizer.vercel.app/
```

---

## 実行ステップ

### Step 1: 準備

1. 引数を解析する
   - `タスク名` が指定されていなければ今日の日付を使う (`YYYYMMDD`)
   - `対象URL` が指定されていなければ `https://se-ability-visualizer.vercel.app/` を使う

2. playwright がインストールされているか確認する
   ```bash
   node -e "require('playwright')" 2>/dev/null || npm install -D playwright
   ```

3. スクリーンショット保存ディレクトリを作成する
   ```
   docs/{タスク名}-screenshots/
   ```

### Step 2: 検証スクリプトの生成と実行

`docs/verify-{タスク名}.mjs` を生成する。スクリプトの要件:

- **ヘッドフルモード**: `chromium.launch({ headless: false, slowMo: 300 })`
- **viewport**: iPhone 14 Pro (390×844)
- **スクリーンショット**: 各ステップ後に `docs/{タスク名}-screenshots/` へ保存
- **結果出力**: `docs/{タスク名}-screenshots/results.json` に保存

検証する操作の内容はアプリの機能に合わせて決定する。SE Ability Visualizer の場合は以下を確認する:

| # | 確認項目 | 使用するセレクター |
|---|---------|-----------------|
| 1 | トップページ表示 | `button` filter `能力を入力する` |
| 2 | 入力ページへ遷移 | `input[type="range"]` count === 7 |
| 3 | プロフィール入力 | `input[type="text"]` × 3 |
| 4 | スライダー7項目操作 | `input[type="range"]` fill |
| 5 | 特殊能力タグ選択 | `button` filter label text |
| 6 | 結果ページへ遷移 | `button` filter `結果を見る` |
| 7 | ステータスカード表示 | body text に名前・タイプ名が含まれる |
| 8 | 入力ページへ戻る | `button` filter `入力に戻る` |
| 9 | リセット機能 | `button` filter `リセット` |
| 10 | localStorage復元 | リロード後に入力値が復元される |
| 🔍 | プローブ（空入力）| バリデーションの有無を確認 |

スクリプトを生成したら実行する:
```bash
node docs/verify-{タスク名}.mjs
```

### Step 3: スクリーンショットの確認

`Read` ツールで主要なスクリーンショット（トップページ・ステータスカード）を読み込んで内容を確認する。

### Step 4: レポート Markdown の生成

`docs/{タスク名}-verification-report.md` を生成する。

レポートに含める内容:
- **対象URL・実施日・検証ツール・判定（PASS/FAIL）**
- **チェックリスト表**（results.json を参照）
- **スクリーンショット** — 相対パスで埋め込む
  ```markdown
  ![トップページ]({タスク名}-screenshots/01-top.png)
  ```
- **所見** — 気になった点（バリデーションなし等）を記載

### Step 5: Git ブランチ作成・コミット・PR 作成

1. ブランチを作成する
   ```bash
   git checkout -b docs/{タスク名}-verification-report
   ```

2. 生成したファイルをすべてコミットする
   - `docs/{タスク名}-verification-report.md`
   - `docs/{タスク名}-screenshots/` (PNG + results.json)
   - `docs/verify-{タスク名}.mjs`

3. push して PR を作成する
   ```bash
   git push -u origin docs/{タスク名}-verification-report
   gh pr create --title "docs: {タスク名} 動作確認レポート" --body "..."
   ```

   PR body に含める内容:
   - 確認対象URL
   - チェックリスト（✅/❌ の表）
   - 含まれるファイルの説明
   - 所見

---

## 注意事項

- **ヘッドフルモード**のため実行中にChromeウィンドウが開く。最小化しても動作に影響なし
- PR 作成前に必ず確認を取ること（`gh pr create` は実行前に内容を提示してユーザーの承認を得る）
- playwright が `node_modules` にない場合は `npm install -D playwright` で追加し、`package.json` もコミットに含める
- Chromium ブラウザが未インストールの場合は `npx playwright install chromium` を先に実行する

---

## 出力フォーマット（最終報告）

```
## Playwright 動作確認 — {タスク名}

**Verdict:** PASS | FAIL | BLOCKED

**対象URL:** {URL}
**実施日:** {日付}
**スクリーンショット:** docs/{タスク名}-screenshots/ ({枚数}枚)

### 結果
{チェックリスト}

### PR
{PR URL}
```
