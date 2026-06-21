# アセットカタログ（アイコン・画像素材一覧）

SE Ability Visualizer 用に生成した画像素材の一覧と、アプリ内での配置想定をまとめたもの。
後でデザインに反映する際の参照用ドキュメント。

- **元画像の保管場所:** `C:\Users\dande\Desktop\SE能力可視化アプリ`（ローカル）
- **アプリ反映時の配置先（想定）:** `public/assets/` 配下にカテゴリ別に格納する
- **スタイル共通点:** 青基調・グロッシー（光沢）・ゲームのステータス画面風

---

## 配置ディレクトリ構成（反映時の想定）

```
public/assets/
  ranks/        # ランクバッジ S〜G
  abilities/    # 7能力アイコン（タイル型）
  icons/        # 汎用UIアイコン
  icons-3d/     # 3D装飾アイコン
  tabs/         # タブ・セクション見出しボタン
  buttons/      # ボタン・バナー・フレーム
  profile/      # アバター・レベル・エンブレム
  backgrounds/  # 背景画像
```

---

## 1. ランクバッジ（`ranks/`）

スコアに応じた S〜G ランク表示。8段階で色が変わる。

| ファイル名 | ランク | 色 | 配置先 |
|-----------|------|------|--------|
| `rank-s.png` | S | 紫 | 90点以上 |
| `rank-a.png` | A | 金 | 80点台 |
| `rank-b.png` | B | 青 | 70点台 |
| `rank-c.png` | C | 緑 | 60点台 |
| `rank-d.png` | D | 黄 | 50点台 |
| `rank-e.png` | E | 銅 | 40点台 |
| `rank-f.png` | F | 銀 | 30点台 |
| `rank-g.png` | G | 黒銀 | 30点未満 |

**配置先:**
- `MainAbilityForm`（入力画面）— 各能力スライダー横の現在ランク表示
- `StatusCard`（結果画面）— 各能力バー横のランク、および総合ランク
- 現在はテキスト＋背景色のバッジ。これらの画像に差し替えると質感が上がる

---

## 2. 能力アイコン・タイル型（`abilities/`）

アプリのメイン能力7項目に1対1で対応する光沢タイルアイコン。

| ファイル名 | 絵柄 | 対応能力（id） |
|-----------|------|--------------|
| `ability-development.png` | コード `</>` ウィンドウ | 開発力（development） |
| `ability-design.png` | 設計図＋立方体 | 設計力（design） |
| `ability-infrastructure.png` | クラウド＋ネットワーク | インフラ力（infrastructure） |
| `ability-database.png` | データベース筒 | DB力（database） |
| `ability-lead.png` | ネクタイの人々 | リード力（lead） |
| `ability-management.png` | チェックリスト＋歯車 | マネジメント力（management） |
| `ability-ai.png` | 脳＋チップ回路 | AI活用力（aiUtilization） |

**配置先:**
- `MainAbilityForm`（入力画面）— 各能力ラベルの左にアイコン
- `StatusCard`（結果画面）— 各能力バー行の先頭アイコン
- `src/data/abilities.ts` の `MainAbility` に `icon` フィールドを追加して紐付ける想定

---

## 3. 汎用UIアイコン（`icons/`）

| ファイル名 | 絵柄 | 配置先（想定） |
|-----------|------|--------------|
| `icon-home.png` | 家（青） | 「トップへ戻る」ボタン |
| `icon-pencil.png` | 鉛筆（青） | 「能力を入力する」「入力に戻る」 |
| `icon-analytics.png` | 棒グラフモニタ | 結果・チャート表示 |
| `icon-arrow-down.png` | 下矢印（青） | スクロール誘導・保存 |
| `icon-download.png` | ダウンロード | スクショ保存の導線 |
| `icon-share.png` | 共有（ネイビー） | 結果画面の共有ボタン |
| `icon-close.png` | ×（青丸） | 閉じる・リセット |
| `icon-plus.png` | ＋（青角） | スライダー値を上げる |
| `icon-minus.png` | −（青角） | スライダー値を下げる |

**配置先:**
- `TopPage` / `InputPage` / `ResultPage` のヘッダー・ボタン
- `icon-plus` / `icon-minus` はスライダーの微調整ボタン（新規追加機能）として活用可能

---

## 4. 3D装飾アイコン（`icons-3d/`）

写実的な3Dイラスト調。タイル型（2章）より装飾・ヒーロー向き。

| ファイル名 | 絵柄 | 配置先（想定） |
|-----------|------|--------------|
| `icon-laptop-3d.png` | ノートPC＋コード | トップ画面の装飾・OGP素材 |
| `icon-database-3d.png` | データベース | 装飾・記事素材 |
| `icon-gear-3d.png` | 歯車 | 装飾・設定系 |
| `icon-shield-3d.png` | 盾＋ダイヤ | 装飾・セキュリティ表現 |
| `icon-cloud-3d.png` | 雲 | 装飾・背景アクセント |

**配置先:**
- `TopPage` の周囲装飾、note/X用のOGP・記事素材
- ※2章のタイル型とデータベース/クラウドが重複するが、用途（UI内 vs 装飾）で使い分ける

---

## 5. タブ・セクション見出し（`tabs/`）

| ファイル名 | ラベル | 配置先（想定） |
|-----------|------|--------------|
| `tab-basic-info.png` | 基本情報 | 入力画面 ProfileForm 見出し |
| `tab-main-ability.png` | メイン能力 | 入力画面 MainAbilityForm 見出し |
| `tab-special-ability.png` | 特殊能力 | 入力画面 SpecialAbilitySelector 見出し |
| `tab-status.png` | ステータス | 結果画面の表示切替タブ（将来） |
| `tab-chart.png` | チャート | 結果画面の表示切替タブ（将来） |
| `tab-radar.png` | レーダー | 結果画面の表示切替タブ（将来） |

**配置先:**
- `基本情報 / メイン能力 / 特殊能力` は入力画面の現行セクション見出し（`— Basic Info —` 等）を画像見出しに差し替え
- `ステータス / チャート / レーダー` は結果画面に複数ビュー（バー／円グラフ／レーダーチャート）を追加する際のタブ

---

## 6. ボタン・バナー・フレーム（`buttons/`）

中身が空のボタン素材。テキストを重ねて使う。

| ファイル名 | 形状・色 | 配置先（想定） |
|-----------|---------|--------------|
| `button-blue-long.png` | 横長・青・白フチ | 主要CTA（結果を見る 等） |
| `button-gold-long.png` / `button-gold-long-2.png` | 横長・金 | 強調CTA・シェア |
| `button-white-long.png` / `button-white-long-2.png` | 横長・白/青フチ | サブCTA |
| `button-pill-blue.png` / `-blue-2.png` | 丸長・青 | トグル・選択ボタン |
| `button-pill-white.png` / `button-pill-light.png` | 丸長・白/淡色 | 非選択状態 |
| `button-circle-blue.png` | 丸・青 | アイコンボタン台座 |
| `button-next-circle.png` | 丸・黒金・`>` | 「次へ／開始」ボタン |
| `banner-blue.png` / `banner-gold.png` / `banner-white.png` | 横長バナー | 見出し・タイトル帯 |
| `frame-horizontal.png` | 横長フレーム | カード内セクション枠 |
| `frame-card-vertical.png` | 縦長カードフレーム | 結果カード全体の枠 |
| `slider-track.png` | 細い青バー | 能力バー／スライダーのトラック |

**配置先:**
- CTAボタン（`TopPage` の開始、`InputPage` の結果を見る、`ResultPage` のシェア）
- `frame-card-vertical` は `StatusCard` の外枠、`slider-track` は能力バーの下地

---

## 7. プロフィール装飾（`profile/`）

| ファイル名 | 絵柄 | 配置先（想定） |
|-----------|------|--------------|
| `avatar-boy.png` | 少年アバター（青パーカー） | 結果カードのプロフィール画像 |
| `banner-level.png` | 「Lv.18」リボン | 結果カードのレベル表示（将来） |
| `emblem-rank-a.png` | 盾「A」＋月桂冠 | 総合ランクのエンブレム表示 |
| `decoration-laurel.png` | 金の月桂冠 | 総合ランク周りの装飾 |

**配置先:**
- `StatusCard` のプロフィール欄。アバター＋レベル＋総合ランクエンブレムでゲーム感を強化
- レベルは能力値合計から算出する新ロジックが必要（将来機能）

---

## 8. 背景画像（`backgrounds/`）

| ファイル名 | 絵柄 | 配置先（想定） |
|-----------|------|--------------|
| `background-sky.png` | 青空＋光（縦長・文字なし） | アプリ全体／トップの背景 |
| `background-sky-2.png` | 青空＋光（別バリエーション） | 予備・記事素材 |
| `app-logo.png` | ロゴ「SE Ability Visualizer」 | トップ画面のメインビジュアル・OGP |

**配置先:**
- `background-sky` は全画面の背景（現在は単色 `bg-slate-900`）。世界観に合わせるなら明るい空背景への変更も検討
- `app-logo` は `TopPage` のタイトル部分、OGP画像、READMEのヘッダー

---

## 反映の進め方（メモ）

1. `public/assets/` に上記構成でコピーする
2. まず効果の大きい **ランクバッジ** と **能力アイコン** から差し替える
3. `MainAbility` 型に `icon` を追加し、`abilities.ts` でパスを紐付ける
4. ボタン・フレーム類はデザイン方針（タスク4）確定後に適用
5. アバター／レベル／レーダーは将来機能のため後回し
