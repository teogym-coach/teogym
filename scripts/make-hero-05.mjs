// 히어로(hero-4000k.png) → 웹 최적화 에셋 생성 (원본 해상도 유지, 색보정 없음)
// 실행: node scripts/make-hero-05.mjs
// - teogym-hero-05        : 가로 원본 (데스크톱·아이패드 가로, 1024px+)
// - teogym-hero-05-tablet : 아이패드 세로 전용 크롭 (768~1023px) — 로고가 헤더/헤드라인 사이 여백에 오도록 상단 71px 제거
// - teogym-hero-05-mobile : 폰 세로 전용 크롭 3:4 (~767px) — 로고 우중앙, 스쿼트랙 좌측, 상단 60px 제거
import { statSync } from 'node:fs';
import sharp from 'sharp';

const src = 'photo-originals/hero-4000k.png';

const variants = [
  { name: 'teogym-hero-05' },
  { name: 'teogym-hero-05-tablet', crop: { left: 150, top: 71, width: 1177, height: 1015 } },
  { name: 'teogym-hero-05-mobile', crop: { left: 300, top: 60, width: 770, height: 1026 } },
];

for (const { name, crop } of variants) {
  const base = () => (crop ? sharp(src).extract(crop) : sharp(src));
  // AVIF: 최신 브라우저 1순위 — 고품질·저용량 / WebP: 폴백 / JPG: 최종 폴백
  await base().avif({ quality: 72, effort: 6 }).toFile(`public/images/${name}.avif`);
  await base().webp({ quality: 90, effort: 6 }).toFile(`public/images/${name}.webp`);
  await base().jpeg({ quality: 90, mozjpeg: true }).toFile(`public/images/${name}.jpg`);
  for (const f of ['avif', 'webp', 'jpg']) {
    const p = `public/images/${name}.${f}`;
    const m = await sharp(p).metadata();
    console.log(`${p}  ${m.width}x${m.height}  ${(statSync(p).size / 1024).toFixed(0)}KB`);
  }
}
