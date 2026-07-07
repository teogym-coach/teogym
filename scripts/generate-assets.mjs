// OG 이미지(PNG)와 apple-touch-icon을 생성합니다.
// 실행: node scripts/generate-assets.mjs
// 브랜드 문구나 컬러를 바꾸면 이 파일을 수정한 뒤 다시 실행하세요.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const FONT = "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";

const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FCFBF8"/>
  <rect x="56" y="56" width="1088" height="518" rx="36" fill="#F4EFE8" stroke="#E8E1D5" stroke-width="2"/>
  <circle cx="1020" cy="160" r="90" fill="#C89A5B" fill-opacity="0.18"/>
  <circle cx="1020" cy="160" r="46" fill="#C89A5B"/>
  <text x="112" y="176" fill="#A87F45" font-size="32" font-weight="700" font-family=${JSON.stringify(FONT)}>청라 프리미엄 1:1 PT 스튜디오</text>
  <text x="108" y="282" fill="#2E2E2E" font-size="82" font-weight="800" font-family=${JSON.stringify(FONT)}>테오짐 PT 청라점</text>
  <text x="110" y="366" fill="#6B655C" font-size="44" font-weight="700" font-family=${JSON.stringify(FONT)}>몸을 기록하고, 관리하는 곳</text>
  <rect x="112" y="410" width="64" height="6" rx="3" fill="#C89A5B"/>
  <text x="112" y="472" fill="#6B655C" font-size="28" font-family=${JSON.stringify(FONT)}>체형교정 · 다이어트 · 벌크업 · 운동기록 관리</text>
  <text x="112" y="522" fill="#6B655C" font-size="26" font-family=${JSON.stringify(FONT)}>인천 서구 청라커낼로 280 청라골든프라자 5층 505호 · 0507-1373-7578</text>
</svg>`;

// 아이콘은 폰트 없이 도형만 사용해 어떤 환경에서도 동일하게 렌더링됩니다.
// T 모노그램: 가로 막대 + 세로 막대.
const iconSvg = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="24" fill="#F4EFE8"/>
  <rect x="24" y="28" width="52" height="12" rx="6" fill="#C89A5B"/>
  <rect x="44" y="28" width="12" height="46" rx="6" fill="#2E2E2E"/>
</svg>`;

await sharp(Buffer.from(ogSvg), { density: 96 }).png().toFile('public/images/og-teogym.png');
console.log('✓ public/images/og-teogym.png (1200x630)');

await sharp(Buffer.from(iconSvg(180))).resize(180, 180).png().toFile('app/apple-icon.png');
console.log('✓ app/apple-icon.png (180x180)');

writeFileSync('app/icon.svg', iconSvg(64));
console.log('✓ app/icon.svg');
