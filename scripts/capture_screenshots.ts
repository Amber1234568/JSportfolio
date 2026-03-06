/**
 * Screenshot capture script for the ADHD Focus Companion demo.
 *
 * Usage:
 *   npm run capture:adhd                  # headless, auto-captures what it can
 *   PAUSE=true npm run capture:adhd       # headed + Playwright Inspector pauses
 *                                         # so you can navigate to each screen manually
 *
 * Output: public/images/adhd-*.png
 *
 * Install deps first (one-time):
 *   npx playwright install --with-deps chromium
 */

import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://x-company-pink.vercel.app';
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const VIEWPORT = { width: 1440, height: 900 };
const PAUSE = process.env.PAUSE === 'true';

/** Screenshots to capture in order. Adjust `route` if the app uses hash/path routing. */
const SHOTS: Array<{ filename: string; route?: string; description: string }> = [
  { filename: 'adhd-hero.png',           route: '/',           description: 'Landing / home screen' },
  { filename: 'adhd-template.png',       route: undefined,     description: 'Template selection screen — navigate there, then resume' },
  { filename: 'adhd-focus.png',          route: undefined,     description: 'Active focus session' },
  { filename: 'adhd-distraction-log.png',route: undefined,     description: 'Distraction log / "what pulled you away?" screen' },
  { filename: 'adhd-reentry.png',        route: undefined,     description: 'Re-entry / return screen' },
  { filename: 'adhd-insights.png',       route: undefined,     description: 'Insights / history view' },
  { filename: 'adhd-settings.png',       route: undefined,     description: 'Settings page' },
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: !PAUSE });
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();

  async function shot(filename: string) {
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(400);
    const outPath = path.join(OUT_DIR, filename);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`  ✓ ${filename}`);
  }

  for (const s of SHOTS) {
    console.log(`\n→ ${s.description}`);

    if (s.route) {
      const url = `${BASE_URL}${s.route}`;
      await page.goto(url, { waitUntil: 'networkidle' }).catch(() =>
        page.goto(url, { waitUntil: 'domcontentloaded' })
      );
    }

    if (PAUSE) {
      console.log(`  ⏸  Paused — navigate to "${s.description}" in the browser, then click Resume in Playwright Inspector.`);
      await page.pause();
    }

    await shot(s.filename);
  }

  await browser.close();
  console.log(`\nAll screenshots saved to ${OUT_DIR}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
