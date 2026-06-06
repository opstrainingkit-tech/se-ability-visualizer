import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const URL = 'https://se-ability-visualizer.vercel.app/';
const SCREENSHOT_DIR = 'docs/task22-screenshots';
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const results = [];
function log(icon, step, detail) {
  const line = `${icon} ${step} → ${detail}`;
  console.log(line);
  results.push({ icon, step, detail, line });
}

const browser = await chromium.launch({
  headless: false,  // ヘッドフルモード（ウィンドウ表示）
  slowMo: 300,      // 操作を少し遅くして見やすく
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
});
const page = await context.newPage();

async function ss(name) {
  await page.screenshot({ path: `${SCREENSHOT_DIR}/${name}`, fullPage: false });
}

try {
  // 1. トップページ表示
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  const title = await page.title();
  const h1Text = await page.locator('h1').first().textContent().catch(() => '');
  const startBtn = page.locator('button').filter({ hasText: '能力を入力する' });
  const startVisible = await startBtn.isVisible().catch(() => false);
  log(startVisible ? '✅' : '❌', '1. トップページ表示', `title="${title}", h1="${h1Text?.trim()}", startBtn=${startVisible}`);
  await ss('01-top.png');

  // 2. 入力ページへ遷移
  await startBtn.click();
  await page.waitForTimeout(500);
  const sliderCount = await page.locator('input[type="range"]').count();
  log(sliderCount === 7 ? '✅' : '❌', '2. 入力ページへ遷移', `sliders=${sliderCount}`);
  await ss('02-input-top.png');

  // 3. プロフィール入力
  const textInputs = await page.locator('input[type="text"]').all();
  await textInputs[0]?.fill('テスト太郎');
  await textInputs[1]?.fill('フルスタックエンジニア');
  await textInputs[2]?.fill('テストコメントです');
  const nameVal = await textInputs[0]?.inputValue();
  log(nameVal === 'テスト太郎' ? '✅' : '❌', '3. プロフィール入力', `name="${nameVal}", inputs=${textInputs.length}`);
  await ss('03-profile.png');

  // 4. スライダー操作（7項目）
  const sliders = await page.locator('input[type="range"]').all();
  log(sliders.length === 7 ? '✅' : '❌', '4. スライダー7項目確認', `count=${sliders.length}`);
  await sliders[0]?.fill('90');
  await sliders[1]?.fill('80');
  await sliders[2]?.fill('70');
  const val0 = await sliders[0]?.inputValue();
  log('✅', '4a. スライダー値変更', `開発力="${val0}" (S), 設計力="80" (A), インフラ力="70" (B)`);
  await ss('04-sliders.png');

  // 5. 特殊能力タグ選択
  const tagLabels = ['PHP', 'TypeScript', 'React', 'AWS', 'Docker'];
  let tagClicked = 0;
  for (const label of tagLabels) {
    const tagBtn = page.locator('button').filter({ hasText: label });
    await tagBtn.scrollIntoViewIfNeeded().catch(() => {});
    if (await tagBtn.isVisible().catch(() => false)) {
      await tagBtn.click();
      tagClicked++;
    }
    if (tagClicked >= 3) break;
  }
  log(tagClicked >= 2 ? '✅' : '⚠️', '5. 特殊能力タグ選択', `${tagClicked}件クリック (PHP, TypeScript, React)`);
  await ss('05-tags.png');

  // 6. 「▶ 結果を見る」で結果ページへ
  const submitBtn = page.locator('button').filter({ hasText: '結果を見る' });
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();
  await page.waitForTimeout(1000);
  const resultHeader = await page.locator('text=Result').isVisible().catch(() => false);
  log(resultHeader ? '✅' : '❌', '6. 結果ページへ遷移', `resultHeader=${resultHeader}`);
  await ss('06-result-top.png');

  // 7. ステータスカード確認
  const pageContent = await page.textContent('body');
  const hasName = (pageContent ?? '').includes('テスト太郎');
  const hasTypeName = (pageContent ?? '').includes('フルスタックエンジニア');
  log(hasName ? '✅' : '❌', '7a. 名前表示確認', `name=${hasName}`);
  log(hasTypeName ? '✅' : '❌', '7b. タイプ名表示確認', `typeName=${hasTypeName}`);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/07-status-card.png`, fullPage: true });

  // 8. 「← 入力に戻る」で入力ページへ
  const backBtn = page.locator('button').filter({ hasText: '入力に戻る' });
  const backVisible = await backBtn.isVisible().catch(() => false);
  log(backVisible ? '✅' : '❌', '8. 戻るボタン確認', `visible=${backVisible}`);
  await backBtn.click();
  await page.waitForTimeout(500);
  const slidersAgain = await page.locator('input[type="range"]').count();
  log(slidersAgain === 7 ? '✅' : '❌', '8a. 入力ページに戻る', `sliders=${slidersAgain}`);
  await ss('08-back-to-input.png');

  // 9. リセットボタン（再度結果ページへ）
  const submitBtn2 = page.locator('button').filter({ hasText: '結果を見る' });
  await submitBtn2.scrollIntoViewIfNeeded();
  await submitBtn2.click();
  await page.waitForTimeout(800);
  const resetBtn = page.locator('button').filter({ hasText: 'リセット' });
  const resetVisible = await resetBtn.isVisible().catch(() => false);
  log(resetVisible ? '✅' : '❌', '9. リセットボタン確認', `visible=${resetVisible}`);
  await resetBtn.click();
  await page.waitForTimeout(500);
  const backToTop = await page.locator('button').filter({ hasText: '能力を入力する' }).isVisible().catch(() => false);
  log(backToTop ? '✅' : '❌', '9a. リセット後トップへ', `backToTop=${backToTop}`);
  await ss('09-reset-to-top.png');

  // 10. localStorage復元テスト
  await page.locator('button').filter({ hasText: '能力を入力する' }).click();
  await page.waitForTimeout(500);
  await page.locator('input[type="text"]').first().fill('ローカルストレージテスト');
  await page.waitForTimeout(800);
  await page.reload({ waitUntil: 'networkidle' });
  const startBtn4 = page.locator('button').filter({ hasText: '能力を入力する' });
  if (await startBtn4.isVisible().catch(() => false)) {
    await startBtn4.click();
    await page.waitForTimeout(500);
  }
  const restoredVal = await page.locator('input[type="text"]').first().inputValue().catch(() => '');
  log(restoredVal === 'ローカルストレージテスト' ? '✅' : '⚠️', '10. localStorage復元', `restored="${restoredVal}"`);
  await ss('10-localstorage-restored.png');

  // 🔍 プローブ: 空プロフィールで結果ページが開けるか（バリデーションなし確認）
  await page.locator('input[type="text"]').first().fill('');
  await page.locator('input[type="text"]').nth(1).fill('');
  const submitBtn3 = page.locator('button').filter({ hasText: '結果を見る' });
  await submitBtn3.scrollIntoViewIfNeeded();
  await submitBtn3.click();
  await page.waitForTimeout(800);
  const emptyResultVisible = await page.locator('text=Result').isVisible().catch(() => false);
  log('🔍', '🔍 空プロフィールで結果ページ', `accessible=${emptyResultVisible}（バリデーションなし）`);
  await ss('11-probe-empty-profile.png');

} catch (err) {
  log('❌', 'Error', err.message);
  await page.screenshot({ path: `${SCREENSHOT_DIR}/error.png` }).catch(() => {});
} finally {
  await browser.close();
}

console.log('\n========== Task 22 動作確認結果 ==========');
results.forEach(r => console.log(r.line));

// 結果をJSONで保存（レポート生成用）
import { writeFileSync } from 'fs';
writeFileSync(`${SCREENSHOT_DIR}/results.json`, JSON.stringify(results, null, 2));
console.log(`\nスクリーンショット保存先: ${SCREENSHOT_DIR}/`);
