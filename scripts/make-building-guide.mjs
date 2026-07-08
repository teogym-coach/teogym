// 건물 안내 이미지 생성: 건물주차.png(2420×1289, 라벨·핀·5층 이중선 라인 포함) 위에
// 기존 라인 경로를 따라 더 두껍고 선명한 단일 스트로크를 덮어 그립니다 (glow 축소).
// 라인 경로는 픽셀 분석으로 측정한 값 (좌측 끝 x734, 코너 x1130, 우측 끝 x1522).
// 실행: node scripts/make-building-guide.mjs
import { statSync } from 'node:fs';
import sharp from 'sharp';

const src = 'photo-originals/건물주차.png';
const out = 'public/images/building-guide-full.jpg';

// 5층 밴드 외곽선 (원본 좌표, 각 변의 중심선)
const top = [[734, 506], [1130, 347.5], [1522, 473]];
const bottom = [[734, 624], [1130, 482.5], [1522, 592]];
const polygon = [...top, ...[...bottom].reverse()];
const points = polygon.map((p) => p.join(',')).join(' ');

// 기존 라인 색을 코어 픽셀에서 샘플링해 평균 (색 일치 → 덮어 그려도 이질감 없음)
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let r = 0, g = 0, b = 0, n = 0;
for (let y = 340; y < 640; y++) {
  for (let x = 720; x < 1540; x += 2) {
    const i = (y * info.width + x) * info.channels;
    const R = data[i], G = data[i + 1], B = data[i + 2];
    if (R > 190 && G > 140 && B < 130 && R - B > 80) { r += R; g += G; b += B; n++; }
  }
}
const color = `rgb(${Math.round(r / n)},${Math.round(g / n)},${Math.round(b / n)})`;
console.log('line color:', color, `(${n}px sampled)`);

// 넓고 옅은 스트로크(잔광, 기존 glow를 자연스럽게 흡수) + 굵고 선명한 코어 스트로크
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="2420" height="1289">
  <polygon points="${points}" fill="none" stroke="${color}" stroke-width="24" stroke-opacity="0.22" stroke-linejoin="round" />
  <polygon points="${points}" fill="none" stroke="${color}" stroke-width="14" stroke-linejoin="round" />
</svg>`);

const full = await sharp(src).composite([{ input: svg }]).toBuffer();
await sharp(full).resize({ width: 1800 }).jpeg({ quality: 85, mozjpeg: true }).toFile(out);
const m = await sharp(out).metadata();
console.log(`${out}  ${m.width}x${m.height}  ${(statSync(out).size / 1024).toFixed(0)}KB`);
