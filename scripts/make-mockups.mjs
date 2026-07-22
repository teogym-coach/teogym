// Record & Care 캐러셀용 목업 3장(PNG) → AVIF 변환
// 원본은 public/images/mockups/*.png 그대로 유지, 표시용 AVIF만 새로 생성
// 실행: node scripts/make-mockups.mjs
import { statSync } from 'node:fs';
import sharp from 'sharp';

const names = ['workout-record', 'progress-analysis', 'member-management'];
const dir = 'public/images/mockups';

for (const name of names) {
  const src = `${dir}/${name}.png`;
  const out = `${dir}/${name}.avif`;
  await sharp(src).resize({ width: 640 }).avif({ quality: 68, effort: 6 }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(`${out}  ${m.width}x${m.height}  ${(statSync(out).size / 1024).toFixed(0)}KB`);
}
