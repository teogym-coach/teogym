// 새 히어로(hero-4000k.png) → 웹 최적화 3종 생성 (크롭·색보정 없음, 원본 해상도 유지)
// 실행: node scripts/make-hero-05.mjs
import { statSync } from 'node:fs';
import sharp from 'sharp';

const src = 'photo-originals/hero-4000k.png';

// AVIF: 최신 브라우저 1순위 — 고품질·저용량
await sharp(src).avif({ quality: 72, effort: 6 }).toFile('public/images/teogym-hero-05.avif');
// WebP: AVIF 미지원 브라우저 폴백
await sharp(src).webp({ quality: 90, effort: 6 }).toFile('public/images/teogym-hero-05.webp');
// JPG: 최종 폴백 + <img src> 기본값
await sharp(src).jpeg({ quality: 90, mozjpeg: true }).toFile('public/images/teogym-hero-05.jpg');

for (const f of ['avif', 'webp', 'jpg']) {
  const p = `public/images/teogym-hero-05.${f}`;
  const m = await sharp(p).metadata();
  console.log(`${f}: ${m.width}x${m.height}, ${(statSync(p).size / 1024).toFixed(0)}KB`);
}
